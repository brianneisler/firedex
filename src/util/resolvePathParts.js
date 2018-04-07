import { has, prop, tail } from 'ramda'
import isWild from './isWild'
import mapJoinPathParts from './mapJoinPathParts'

const resolvePathParts = (parts, data = {}) =>
  mapJoinPathParts((part) => {
    if (isWild(part)) {
      const name = tail(part)
      if (!has(name, data)) {
        throw new Error(`Cannot resolve path because data does not have property for ${part}`)
      }
      return prop(name, data)
    }
    return part
  }, parts)

export default resolvePathParts
