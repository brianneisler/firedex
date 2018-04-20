import { curryN } from 'ramda'
import opRemoveOne from './util/opRemoveOne'

const removeOne = curryN(2, (database, schema, conditions = {}) => {
  const op = opRemoveOne({ schema, conditions })
  return op.exec(database)
})

export default removeOne
