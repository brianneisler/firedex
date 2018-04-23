import { is, isNil, keys, map, path, split } from 'ramda'

const getIndexKeys = (index, data) => map(
  (indexKey) => {
    const value = path(split('.', indexKey), data)
    if (isNil(value)) {
      throw new Error(`A nil value was found while indexing the key ${indexKey}. The current data is ${JSON.stringify(data)}`)
    }
    if (is(Object, value)) {
      throw new Error(`An object value was found while indexing the key ${indexKey}. Object indexing is not currently supported. The current data is ${JSON.stringify(data)}.`)
    }
    return value
  },
  keys(index.props)
)

export default getIndexKeys
