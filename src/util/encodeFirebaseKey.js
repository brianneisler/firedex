import { pipe, replace } from 'ramda'

const encodeFirebaseKey = pipe(
  replace(/%/g, '%25'),
  replace(/\./g, '%2E'),
  replace(/#/g, '%23'),
  replace(/\$/g, '%24'),
  replace(/\//g, '%2F'),
  replace(/\[/g, '%5B'),
  replace(/\]/g, '%5D')
)

export default encodeFirebaseKey
