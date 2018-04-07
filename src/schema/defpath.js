import parseParts from '../util/parseParts'

const defpath = (def) => ({
  ...def,
  parts: parseParts(def)
})
export default defpath
