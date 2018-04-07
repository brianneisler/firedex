import { map, prop, replace } from 'ramda'
import wilds from './wilds'

const replaceWilds = (path, data) => reduce(
  (result, wild) => replace(`$${wild}`, prop(wild, data), result),
  path.value,
  wilds(path)
)

export default replaceWilds
