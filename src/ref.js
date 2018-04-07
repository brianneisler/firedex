import { curry } from 'ramda'
import create from './create'
import find from './find'
import findOne from './findOne'
import generate from './generate'
import query from './query'
import remove from './remove'
import removeOne from './removeOne'
import set from './set'
import setOne from './setOne'
import update from './update'
import updateOne from './updateOne'

const ref = curry((database, schema) => ({
  create: (...args) => create(database, schema, ...args),
  find: (...args) => find(database, schema, ...args),
  findOne: (...args) => findOne(database, schema, ...args),
  generate: (...args) => generate(database, schema, ...args),
  query: (...args) => query(database, schema, ...args),
  remove: (...args) => remove(database, schema, ...args),
  removeOne: (...args) => removeOne(database, schema, ...args),
  set: (...args) => set(database, schema, ...args),
  setOne: (...args) => setOne(database, schema, ...args),
  update: (...args) => update(database, schema, ...args),
  updateOne: (...args) => updateOne(database, schema, ...args)
}))

export default ref
