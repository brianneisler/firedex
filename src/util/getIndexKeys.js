import { keys, map, path, split } from 'ramda'

const getIndexKeys = (index, data) => map(
  (indexKey) => path(split('.', indexKey), data),
  keys(index.props)
)

export default getIndexKeys
