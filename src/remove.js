import { curryN } from 'ramda'
import opRemove from './util/opRemove'

const remove = curryN(2, (database, schema, conditions = {}) => {
  const op = opRemove({ schema, conditions })
  return op.exec(database)
})

export default remove
