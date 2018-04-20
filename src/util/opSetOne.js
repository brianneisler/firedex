// TODO
// import { is, isNil } from 'ramda'
import fireref from './fireref'
import firequery from './firequery'
import generateIndexUpdates from './generateIndexUpdates'
import resolvePath from './resolvePath'
import validateOpConditions from './validateOpConditions'
import validateOpSchema from './validateOpSchema'
import validateOpValue from './validateOpValue'
import generate from '../generate'


// const generateIndexUpdates = (schema, prevData, data, resolvedPath) => {
//   const { indexes, path } = schema
//   const { parts } = path
//
//   if (indexes) {
//     return reduce((updates, index) => {
//       const indexId = join('/', parts) + index.toQuerystring()
//       // TODO BRN: Deal with asc vs desc indexes
//       const indexKeys = getIndexKeys(index, data)
//       const indexPath = mapJoinPathParts(identity, [
//         'indexes',
//         indexId,
//         ...indexKeys
//       ])
//       // TODO BRN: Deal with unique vs non unique index values
//       // must have a unique key for the value being indexed
//       // perhaps the index values concatenated
//       const indexValues = getIndexValues(path, resolvedPath)
//       return {
//         ...updates,
//         [indexPath]: indexValues
//       }
//     }, {}, indexes)
//   }
//   return {}
// }

const opSet = (model) => {
  const {
    conditions,
    data,
    hydration,
    schema,
    value
  } = model

  validateOpSchema(schema)
  validateOpConditions(conditions)
  validateOpValue(schema, value)

  const hydrate = async (database) =>
    opSet({
      ...model,
      hydration: await firequery(database, {
        path: schema.path,
        conditions
      }).exec().once('value')
    })

  const gen = async (database) => {
    if (!hydration) {
      const op = await hydrate(database)
      return op.gen(database)
    }
    return opSet({
      ...model,
      data: generate(database, schema, hydration.val(), value)
    })
  }

  const toUpdates = () => {
    if (!data) {
      throw new Error('Op must first be generated before it can provide updates')
    }
    const resolvedPath = resolvePath(schema, conditions)
    return {
      [resolvedPath]: value,
      ...generateIndexUpdates(schema, hydration.val(), data, resolvedPath)
    }
  }

  const exec = async (database) => {
    if (!data) {
      const op = await gen(database)
      return op.exec(database)
    }
    const updates = toUpdates(database)
    await fireref(database, '/')
      .update(updates)
    return firequery(database, {
      path: resolvePath(schema, data),
      conditions
    }).exec().once('value')
  }

  return {
    exec,
    gen,
    hydrate,
    toUpdates
  }
}

export default opSet
