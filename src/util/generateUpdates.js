import { reduce } from 'ramda'

const generateUpdates = (ops) =>
  reduce((updates, op) => ({
    ...updates,
    ...op.toUpdates()
  }), {}, ops)

export default generateUpdates
