import { map, pick, tail } from 'ramda'
import getWilds from './getWilds'

const pickWilds = (parts, data) => {
  const wilds = getWilds(parts)
  const wildNames = map(tail, wilds)
  return pick(wildNames, data)
}

export default pickWilds
