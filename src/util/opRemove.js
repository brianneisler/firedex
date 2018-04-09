/* eslint-disable */
import fireref from './fireref'
import resolvePathParts from './resolvePathParts'
import validateOpConditions from './validateOpConditions'
import validateOpSchema from './validateOpSchema'
import query from '../query'

//TODO BRN: This needs to be written

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
      hydration: await query(database, schema).find(conditions)
    })

  const toUpdates = () => {
    const { path } = schema
    const { parts } = path
    const resolvedPath = resolvePathParts(parts, conditions)
    return {
      [resolvedPath]: data,
      ...generateIndexUpdates(schema, data, resolvedPath)
    }
  }

  const exec = async (database) => {
    if (!hydration) {
      const op = await hydrate(database)
      return op.exec(database)
    }
    const updates = toUpdates()
    return fireref(database, '/')
      .update(updates)
      .then(() => hydration)
  }

  return {
    exec,
    hydrate,
    toUpdates
  }
}

export default opRemove
