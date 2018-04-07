import { curry } from 'ramda'
import opSet from './util/opSet'

const set = curry((database, schema, conditions, value) => {
  const op = opSet({ schema, conditions, value })
  return op.exec(database)
})

export default set
