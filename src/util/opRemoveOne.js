import { isEmpty } from 'ramda'
import firequery from './firequery'
import fireref from './fireref'
import getFirstSnapshotChild from './getFirstSnapshotChild'
import getSnapshotPath from './getSnapshotPath'
import resolvePath from './resolvePath'
import validateOpConditions from './validateOpConditions'
import validateOpSchema from './validateOpSchema'


const opRemoveOne = (model = {}) => {
  const {
    conditions,
    hydration,
    schema
  } = model

  validateOpSchema(schema)
  validateOpConditions(conditions)

  const hydrate = async (database) => {
    let query = {
      path: schema.path,
      conditions
    }
    if (!isEmpty(conditions)) {
      query = {
        ...query,
        limitToFirst: 1
      }
    }
    return opRemoveOne({
      ...model,
      hydration: await firequery(database, query)
        .exec()
        .once('value')
    })
  }

  const toUpdates = () => {
    if (!hydration) {
      throw new Error('Op must first be hydrated before it can provide updates')
    }
    if (isEmpty(conditions)) {
      const resolvedPath = resolvePath(schema, conditions)
      return {
        [resolvedPath]: null
        // ...generateIndexUpdates(schema, data, resolvedPath)
      }
    }
    const snapshot = getFirstSnapshotChild(hydration)
    const snapPath = getSnapshotPath(snapshot)
    return {
      [snapPath]: null
    }
  }

  const exec = async (database) => {
    if (!hydration) {
      const op = await hydrate(database)
      return op.exec(database)
    }
    const updates = toUpdates()
    await fireref(database, '/')
      .update(updates)
    if (isEmpty(conditions)) {
      return hydration
    }
    return getFirstSnapshotChild(hydration)
  }

  return {
    exec,
    hydrate,
    toUpdates
  }
}

export default opRemoveOne
