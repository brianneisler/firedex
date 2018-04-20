import { URL } from 'url'

const getRefPath = (ref) => {
  const url = new URL(ref.toString())
  return url.pathname
}

export default getRefPath
