import { is } from 'ramda'

const validateOpSchema = (schema) => {
  if (!is(Object, schema)) {
    throw new Error(`Parameter 'schema' is exepected to be an Object. Instead was give ${schema}`)
  }
  if (!is(Object, schema.path)) {
    throw new Error(`Schema ${schema.name} is missing a path`)
  }
}

export default validateOpSchema
