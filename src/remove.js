import { curry } from 'ramda'
import opRemove from './util/opRemove'

const remove = curry((database, schema, conditions) => {
  const op = opRemove({ schema, conditions })
  return op.exec(database)
})

export default remove
