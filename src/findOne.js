import { curry } from 'ramda'
import query from './query'

const findOne = curry((database, schema, conditions) =>
  query(database, schema)
    .findOne(conditions))

export default findOne
