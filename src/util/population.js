import { mapObjIndexed } from 'ramda'
import all from './all'
import firequery from './firequery'
import firesnap from './firesnap'
import resolveMapping from './resolveMapping'

const doPopulation = async (database, populate, snapshot) => {
  const data = snapshot.val()
  const populated = await all(mapObjIndexed(populate, async (ref) => {
    const { reference, schema } = ref
    const snap = await firequery(database, {
      path: schema.path,
      conditions: mapObjIndexed((mapping) => resolveMapping(mapping, data), reference)
    }).exec()
    return snap
  }))


  const child = (childPathString) => {
    throw new Error('TODO: "child" for projection needs to be implemented')
  }

  const exportVal = () => {
    throw new Error('TODO: "exportVal" for projection needs to be implemented')
  }

  const forEach = (action) => {
    throw new Error('TODO: "forEach" for projection needs to be implemented')
  }

  const hasChild = (childPathString) => {
    throw new Error('TODO: "hasChild" for projection needs to be implemented')
  }

  const hasChildren = () => {
    throw new Error('TODO: "hasChildren" for projection needs to be implemented')
  }

  const numChildren = () => {
    throw new Error('TODO: "numChildren" for projection needs to be implemented')
  }

  const val = () => ({
    ...data,
    ...populated
  })

  return firesnap(snapshot, {
    child,
    exportVal,
    forEach,
    hasChild,
    hasChildren,
    numChildren,
    val
  })
}

const populator = (database, populate, query) => {
  const on = (eventType, callback, cancelCallback, context) => {
    const ref = query.exec()

    return ref.on(eventType, (snapshot, prevChildKey) => {
      const data = snapshot.val()

      // TODO BRN: This behavior needs to be different based on whether the
      // query is a findOne query or a find query.

      callback.call(context, snapshot, prevChildKey)
    }, cancelCallback, context)
  }

  const once = (eventType) => {
    const ref = query.exec()
    return ref
      .once(eventType)
      .then((snapshot) => doPopulation(database, populate, snapshot))
  }

  const then = (fulfilledHandler, rejectedHandler) =>
    query.exec()
      .then((snapshot) => doPopulation(database, populate, snapshot))
      .then(fulfilledHandler, rejectedHandler)

  return {
    ...query,
    on,
    once,
    then
  }
}

const population = (database, populate, query) => {
  const exec = () => populator(database, populate, query)
  return ({
    exec
  })
}

export default population
