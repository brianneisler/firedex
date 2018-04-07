import { dropLast, is, isEmpty, last, split, tail } from 'ramda'

const parseParts = (path) => {
  let parts
  if (is(String, path)) {
    parts = split('/', path)
    if (isEmpty(last(parts))) {
      parts = dropLast(1, parts)
    }
    if (isEmpty(parts[0])) {
      parts = tail(parts)
    }
  } else {
    ({ parts } = path)
  }
  return parts
}

export default parseParts
