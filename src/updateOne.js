import { curry } from 'ramda'
import opUpdateOne from './util/opUpdateOne'

const updateOne = curry((database, schema, conditions, udpates) => {
  const op = opUpdateOne({ schema, conditions, udpates })
  return op.exec(database)
})

export default updateOne
