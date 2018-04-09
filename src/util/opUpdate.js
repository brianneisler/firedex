/* eslint-disable */
import { mapObjIndexed } from 'ramda'
import generate from '../generate'
import firequery from './firequery'
import fireref from './fireref'
import resolvePath from './resolvePath'
import validateOpConditions from './validateOpConditions'
import validateOpSchema from './validateOpSchema'
import validateOpUpdates from './validateOpUpdates'

const opUpdate = (model) => {
  const {
    conditions,
    data,
    hydration,
    schema,
    updates
  } = model

  validateOpConditions(conditions)
  validateOpSchema(schema)
  validateOpUpdates(updates)

  const hydrate = async (database) =>
    opUpdate({
      ...model,
      hydration: await firequery(database, {
        conditions,
        path: schema.path
      }).exec().once('value')
    })

  const gen = async (database) => {
    if (!hydration) {
      const op = hydrate(database)
      return op.gen(database)
    }
    return opUpdate({
      ...model,
      data: mapObjIndexed(
        (hydra) => generate(database, schema, 'update', hydra, updates),
        hydration
      )
    })
  }

  const toUpdates = () => {
    if (!data) {
      throw new Error('Op must first be generated before it can provide updates')
    }

    // TODO BRN
    // return reduce((dbUpdates))
    //
    // const resolvedPath = resolvePath(schema, data)
    // return {
    //   [resolvedPath]: data,
    //   ...generateIndexUpdates(schema, data, resolvedPath)
    // }
  }

  const exec = async (database) => {
    if (!data) {
      const op = await gen(database)
      return op.exec(database)
    }
    return fireref(database, '/')
      .update(toUpdates())
  }


  return {
    exec,
    gen,
    hydrate,
    toUpdates
  }
}

export default opUpdate
