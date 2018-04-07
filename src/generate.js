import { curry, is } from 'ramda'

const generate = curry((database, schema, opType, prevValue, data) => {
  if (is(Function, schema.generate)) {
    return schema.generate(database, schema, opType, prevValue, data)
  }
  return data
})

export default generate
