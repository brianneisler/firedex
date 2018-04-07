import { identity, join, reduce } from 'ramda'
import getIndexKeys from './getIndexKeys'
import getIndexValues from './getIndexValues'
import mapJoinPathParts from './mapJoinPathParts'

const generateIndexUpdates = (schema, data, resolvedPath) => {
  const { indexes, path } = schema
  const { parts } = path

  if (indexes) {
    return reduce((updates, index) => {
      const indexId = join('/', parts) + index.toQuerystring()
      // TODO BRN: Deal with asc vs desc indexes
      const indexKeys = getIndexKeys(index, data)
      const indexPath = mapJoinPathParts(identity, [
        'indexes',
        indexId,
        ...indexKeys
      ])
      // TODO BRN: Deal with unique vs non unique index values
      // must have a unique key for the value being indexed
      // perhaps the index values concatenated
      const indexValues = getIndexValues(path, resolvedPath)
      return {
        ...updates,
        [indexPath]: indexValues
      }
    }, {}, indexes)
  }
  return {}
}

export default generateIndexUpdates
