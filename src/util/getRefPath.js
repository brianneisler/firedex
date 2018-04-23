import { head, join, remove, split } from 'ramda'
import { URL } from 'url'

const getRefPath = (database, ref) => {
  const url = new URL(ref.toString())
  const { pathname } = url
  const { namespace } = database
  if (namespace) {
    const parts = split('/', pathname)
    let index = 0
    if (head(parts) === '') {
      index += 1
    }
    if (parts[index] === namespace) {
      return join('/', remove(index, 1, parts))
    }
  }
  return pathname
}

export default getRefPath
