import { reduce } from 'ramda'

const generateUpdates = (database, ops) =>
  reduce((updates, op) => ({
    ...updates,
    ...op.toUpdates(database)
  }), {}, ops)

export default generateUpdates
