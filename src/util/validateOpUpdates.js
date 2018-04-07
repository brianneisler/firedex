import { is } from 'ramda'

const validateOpUpdates = (updates) => {
  if (!is(Object, updates)) {
    throw new Error('\'updates\' is expected to be an object.')
  }
}

export default validateOpUpdates
