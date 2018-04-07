import { curry } from 'ramda'
import query from './query'

const find = curry((database, schema, conditions) =>
  query(database, schema)
    .find(conditions))

export default find
