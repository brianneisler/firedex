import { stringify } from 'querystringify'

const defindex = (props, options = {}) => {
  const unique = options.unique || false

  const toQuerystring = () => stringify({
    '.unique': unique,
    ...props
  }, true)

  return {
    props,
    toQuerystring,
    unique
  }
}

defindex.ASC = 1
defindex.DEC = -1

export default defindex
