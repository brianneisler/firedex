import { split, tail } from 'ramda'
import isWild from './isWild'
import reduceIndex from './reduceIndex'

const getIndexValues = (path, resolvedPath) => {
  const { parts } = path
  const resolvedParts = split('/', resolvedPath)
  return reduceIndex((values, part, index) => {
    if (isWild(part)) {
      const name = tail(part)
      const resolvedPart = resolvedParts[index]
      return {
        ...values,
        [ name ]: resolvedPart
      }
    }
    return values
  }, {}, parts)
}

export default getIndexValues
