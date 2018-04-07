import { any } from 'ramda'
import isWild from './isWild'

const hasWilds = any(isWild)

export default hasWilds
