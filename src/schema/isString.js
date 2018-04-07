import defn from './defn'
import is from './is'
import String from '../schemas/String'

const isString = defn('isString', is(String))

export default isString
