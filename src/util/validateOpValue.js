import { is } from 'ramda'

const validateOpValue = (schema, value) => {
  if (is(Object, schema.props) && !is(Object, value)) {
    throw new Error(`Schema ${schema.name} has props, therefore value is expected to be an object.`)
  }
}

export default validateOpValue
