import { curry } from 'ramda'
import opSetOne from './util/opSetOne'

const setOne = curry((database, schema, conditions, value) => {
  const op = opSetOne({ schema, conditions, value })
  return op.exec(database)
})

export default setOne
