import { prop, reduce, values } from 'ramda'
import firesnap from './firesnap'


const ops = {
  first: (value) => values(value)[0]
}
const doProjection = (proj, snapshot) => {
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

  const val = () => {
    if (proj) {
      return reduce((value, opName) => {
        const op = prop(opName, ops)
        if (!op) {
          throw new Error(`Cannot find projection operation with the name ${opName}`)
        }
        return op(value)
      }, snapshot.val(), proj)
    }
    return snapshot.val()
  }

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

const projector = (database, proj, query) => {
  const on = (eventType, callback, cancelCallback, context) => {
    const ref = query.exec()
    return ref.on(eventType, (snapshot, prevChildKey) => {
      callback.call(context, doProjection(proj, snapshot), prevChildKey)
    }, cancelCallback, context)
  }

  const once = (eventType) => {
    const ref = query.exec()
    return ref
      .once(eventType)
      .then((snapshot) => doProjection(proj, snapshot))
  }

  const then = (fulfilledHandler, rejectedHandler) =>
    query.exec()
      .then((snapshot) => doProjection(proj, snapshot))
      .then(fulfilledHandler, rejectedHandler)

  return {
    ...query,
    on,
    once,
    then
  }
}

const projection = (database, proj, query) => {
  const exec = () => projector(database, proj, query)
  return ({
    exec
  })
}

export default projection
