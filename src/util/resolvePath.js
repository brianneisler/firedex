import resolvePathParts from './resolvePathParts'

const resolvePath = (schema, data = {}) => {
  const { path } = schema
  const { parts } = path
  return resolvePathParts(parts, data)
}

export default resolvePath
