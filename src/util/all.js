import { is, keys, mapObjIndexed, values, zipObj } from 'ramda'

const all = async (value) => {
  if (is(Object, value)) {
    const objKeys = keys(value)
    const objValues = await Promise.all(values(mapObjIndexed(Promise.resolve, value)))
    return zipObj(objKeys, objValues)
  }
  return Promise.all(value)
}

export default all
