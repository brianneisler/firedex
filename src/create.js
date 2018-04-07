import { curry } from 'ramda'
import opCreate from './util/opCreate'

const create = curry(async (database, schema, value) => {
  const op = opCreate({ schema, value })
  return op.exec(database)
})

export default create
