import { append } from 'ramda'
import fireref from './util/fireref'
import generateUpdates from './util/generateUpdates'
import hydrateOps from './util/hydrateOps'
import opCreate from './util/opCreate'
import opRemove from './util/opRemove'
import opRemoveOne from './util/opRemoveOne'
import opSet from './util/opSet'
import opSetOne from './util/opSetOne'
import opUpdate from './util/opUpdate'
import opUpdateOne from './util/opUpdateOne'

const transaction = (database, model = { ops: [] }) => {
  const exec = async () => {
    const hydratedOps = await hydrateOps(model.ops)
    const updates = generateUpdates(hydratedOps)
    try {
      return fireref(database, '/')
        .update(updates)
    } catch (error) {
      // TODO BRN: Check the error to see if we ran into an index problem.
      // If so, it's possible that a conflict occurred due to another client
      // trying to write to the same location
      throw error
    }
  }

  const create = (schema, value) => {
    const op = opCreate({ schema, value })
    return transaction(database, {
      ...model,
      ops: append(op, model.ops)
    })
  }

  const remove = (schema, conditions) => {
    const op = opRemove({ schema, conditions })
    return transaction(database, {
      ...model,
      ops: append(op, model.ops)
    })
  }

  const removeOne = (schema, conditions) => {
    const op = opRemoveOne({ schema, conditions })
    return transaction(database, {
      ...model,
      ops: append(op, model.ops)
    })
  }

  const set = (schema, conditions, value) => {
    const op = opSet({ schema, conditions, value })
    return transaction(database, {
      ...model,
      ops: append(op, model.ops)
    })
  }

  const setOne = (schema, conditions, value) => {
    const op = opSetOne({ schema, conditions, value })
    return transaction(database, {
      ...model,
      ops: append(op, model.ops)
    })
  }

  const update = (schema, conditions, updates) => {
    const op = opUpdate({ schema, conditions, updates })
    return transaction(database, {
      ...model,
      ops: append(op, model.ops)
    })
  }

  const updateOne = (schema, conditions, updates) => {
    const op = opUpdateOne({ schema, conditions, updates })
    return transaction(database, {
      ...model,
      ops: append(op, model.ops)
    })
  }

  return {
    create,
    exec,
    remove,
    removeOne,
    set,
    setOne,
    update,
    updateOne
  }
}

export default transaction
