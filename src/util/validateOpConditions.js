import { is } from 'ramda'

const validateOpConditions = (conditions) => {
  if (!is(Object, conditions)) {
    throw new Error(`Parameter 'conditions' is exepected to be an Object. Instead was given ${conditions}`)
  }
}

export default validateOpConditions
