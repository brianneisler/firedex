import { prop, replace, startsWith } from 'ramda'

const THIS_TOKEN = '$this.'

const resolveMapping = (mapping, data) => {
  if (!startsWith(THIS_TOKEN, mapping)) {
    throw new Error(`The reference mapping given '${mapping}' does not start with "$this.". Don't know how to handle the given string.`)
  }
  const key = replace(THIS_TOKEN, '', mapping)
  return prop(key, data)
}

export default resolveMapping
