import { pipe, replace } from 'ramda'

const decodeFirebaseKey = pipe(
  replace(/%25/g, '%'),
  replace(/%2E/g, '.'),
  replace(/%23/g, '#'),
  replace(/%24/g, '$'),
  replace(/%2F/g, '/'),
  replace(/%5B/g, '['),
  replace(/%5D/g, ']')
)

export default decodeFirebaseKey
