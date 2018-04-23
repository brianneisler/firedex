import { is, join, map } from 'ramda'
import encodeFirebaseKey from './encodeFirebaseKey'

const mapJoinPathParts = (fn, parts) =>
  join('/', map((part) => {
    const pathPart = fn(part)
    if (is(String, pathPart)) {
      return encodeFirebaseKey(pathPart)
    }
    return pathPart
  }, parts))


export default mapJoinPathParts
