import { map, omit, tail } from 'ramda'
import getWilds from './getWilds'

const omitWilds = (parts, data) => {
  const wilds = getWilds(parts)
  const wildNames = map(tail, wilds)
  return omit(wildNames, data)
}

export default omitWilds
