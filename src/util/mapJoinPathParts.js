import { join, map } from 'ramda'
import encodeFirebaseKey from './encodeFirebaseKey'

const mapJoinPathParts = (fn, parts) =>
  join('/', map((part) => {
    const pathPart = fn(part)
    return encodeFirebaseKey(pathPart)
  }, parts))


export default mapJoinPathParts
