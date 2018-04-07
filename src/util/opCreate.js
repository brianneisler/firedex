import { identity, join, reduce } from 'ramda'
import generate from '../generate'
import firequery from './firequery'
import fireref from './fireref'
import getIndexKeys from './getIndexKeys'
import getIndexValues from './getIndexValues'
import mapJoinPathParts from './mapJoinPathParts'
import resolvePath from './resolvePath'
import validateOpSchema from './validateOpSchema'
import validateOpValue from './validateOpValue'


const generateIndexUpdates = (schema, data, resolvedPath) => {
  const { indexes, path } = schema
  const { parts } = path

  if (indexes) {
    return reduce((updates, index) => {
      const indexId = join('/', parts) + index.toQuerystring()
      // TODO BRN: Deal with asc vs desc indexes
      const indexKeys = getIndexKeys(index, data)
      const indexPath = mapJoinPathParts(identity, [
        'indexes',
        indexId,
        ...indexKeys
      ])
      // TODO BRN: Deal with unique vs non unique index values
      // must have a unique key for the value being indexed
      // perhaps the index values concatenated
      const indexValues = getIndexValues(path, resolvedPath)
      return {
        ...updates,
        [indexPath]: indexValues
      }
    }, {}, indexes)
  }
  return {}
}

const opCreate = (model = {}) => {
  const {
    data,
    // hydration,
    schema,
    value
  } = model

  validateOpSchema(schema)
  validateOpValue(schema, value)

  const gen = async (database) =>
    opCreate({
      ...model,
      data: generate(database, schema, 'create', null, value)
    })

  const toUpdates = () => {
    if (!data) {
      throw new Error('Op must first be generated before it can provide updates')
    }

    const resolvedPath = resolvePath(schema, data)
    return {
      [resolvedPath]: data,
      ...generateIndexUpdates(schema, data, resolvedPath)
    }
  }

  const exec = async (database) => {
    if (!data) {
      const op = await gen(database)
      return op.exec(database)
    }
    const updates = toUpdates()
    await fireref(database, '/')
      .update(updates)
    return firequery(database, {
      path: resolvePath(schema, data)
    }).exec().once('value')
  }

  return {
    exec,
    gen,
    toUpdates
  }
}

export default opCreate
