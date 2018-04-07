import { filter } from 'ramda'
import isWild from './isWild'

const getWilds = filter(isWild)

export default getWilds
