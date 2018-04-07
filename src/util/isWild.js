import { is } from 'ramda'

const isWild = (part) => is(String, part) && part[0] === '$'

export default isWild
