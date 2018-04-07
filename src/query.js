import { concat, curryN, equals, has, is, isNil, mergeDeepWith, prop, reduce } from 'ramda'
import firequery from './util/firequery'
import population from './util/population'
import projection from './util/projection'

/*
model = {
  path: string,
  conditions: {
    <field>: string
  }
}
*/


const getCancelAndContextArgs = (cancelOrContext, context) => {
  if (cancelOrContext && context) {
    return {
      cancel: cancelOrContext,
      context
    }
  } else if (cancelOrContext) {
    if (is(Object, cancelOrContext) && !isNil(cancelOrContext)) {
      return {
        cancel: null,
        context: cancelOrContext
      }
    } else if (is(Function, cancelOrContext)) {
      return {
        cancel: cancelOrContext,
        context: null
      }
    }
    throw new Error('must either be a cancel callback or a context object.')
  }
  return {
    cancel: null,
    context: null
  }
}

const merge = mergeDeepWith(concat)

const query = curryN(2, (database, schema, model = {}) => {
  let reference
  const callbacks = new WeakMap()

  const getRef = () => {
    if (!reference) {
      let newQuery = firequery(database, {
        path: schema.path,
        ...model
      })
      if (model.population) {
        newQuery = population(database, model.populate, newQuery)
      }
      if (model.projection) {
        newQuery = projection(database, model.projection, newQuery)
      }
      reference = newQuery.exec()
    }
    return reference
  }

  /**
   * @returns {Array}
   */
  const find = (conditions) => query(database, schema, merge(model, {
    conditions
  }))

  /**
   * @returns {*}
   */
  const findOne = (conditions) => query(database, schema, merge(model, {
    conditions,
    projection: [
      'first'
    ]
  }))

  /**
   * @returns {boolean}
   */
  const isEqual = (otherQuery) => {
    if (has('model', otherQuery)) {
      return equals(model, otherQuery.model)
    }
    return false
  }

  const off = (eventType, callback, context) => {
    const ref = getRef()
    const resultCallback = callbacks.get(callback)
    return ref.off(eventType, resultCallback, context)
  }

  const on = (eventType, callback, cancelCallbackOrContext, possibleContext) => {
    const { cancel, context } = getCancelAndContextArgs(cancelCallbackOrContext, possibleContext)
    const ref = getRef()
    const resultCallback = ref.on(
      eventType,
      callback,
      cancel,
      context
    )
    callbacks.set(callback, resultCallback)
    return callback
  }

  const once = (eventType, successCallback, cancelCallbackOrContext, possibleContext) => {
    const { cancel, context } = getCancelAndContextArgs(cancelCallbackOrContext, possibleContext)
    let ref = getRef()
    ref = ref
      .once(eventType)
      .then((snapshot) => {
        if (successCallback) {
          successCallback.call(context, snapshot)
        }
        return snapshot
      })

    if (cancel) {
      return ref.catch(cancel)
    }
    return ref
  }

  const populate = (keys) =>
    query(database, schema, merge(model, {
      populate: reduce((refs, key) => {
        if (!has(key, schema.refs)) {
          throw new Error(`Cannot find reference for populate key '${key}'`)
        }
        return {
          [key]: prop(key, schema.refs),
          ...refs
        }
      }, {}, keys)
    }))

  const then = (fulfilledHandler, rejectedHandler) => {
    const ref = getRef()
    return ref
      .once('value')
      .then(
        fulfilledHandler,
        rejectedHandler
      )
  }

  return {
    find,
    findOne,
    getRef,
    isEqual,
    model,
    off,
    on,
    once,
    populate,
    then
  }
})

export default query
