import { curry } from 'ramda'
import opRemoveOne from './util/opRemoveOne'

const removeOne = curry((database, schema, conditions) => {
  const op = opRemoveOne({ schema, conditions })
  return op.exec(database)
})

export default removeOne
