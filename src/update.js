import { curry } from 'ramda'
import opUpdate from './util/opUpdate'

const update = curry((database, schema, conditions, udpates) => {
  const op = opUpdate({ schema, conditions, udpates })
  return op.exec(database)
})

export default update
