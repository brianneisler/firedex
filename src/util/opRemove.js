import { assoc, isEmpty, reduce, values } from 'ramda'
import firequery from './firequery'
import fireref from './fireref'
import getSnapshotChildren from './getSnapshotChildren'
import getSnapshotPath from './getSnapshotPath'
import resolvePath from './resolvePath'
import validateOpConditions from './validateOpConditions'
import validateOpSchema from './validateOpSchema'


const opRemove = (model = {}) => {
  const {
    conditions,
    hydration,
    schema
  } = model

  validateOpSchema(schema)
  validateOpConditions(conditions)

  const hydrate = async (database) =>
    opRemove({
      ...model,
      hydration: await firequery(database, {
        path: schema.path,
        conditions
      }).exec().once('value')
    })

  const toUpdates = (database) => {
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
    const children = getSnapshotChildren(hydration)
    return reduce(
      (updates, snapshot) => {
        const snapPath = getSnapshotPath(database, snapshot)
        return assoc(snapPath, null, updates)
      },
      {},
      values(children)
    )
  }

  const exec = async (database) => {
    if (!hydration) {
      const op = await hydrate(database)
      return op.exec(database)
    }
    const updates = toUpdates(database)

    await fireref(database, '/')
      .update(updates)
    return hydration
  }

  return {
    exec,
    hydrate,
    toUpdates
  }
}

export default opRemove
