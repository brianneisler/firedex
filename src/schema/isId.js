import defn from './defn'
import is from './is'
import Id from '../schemas/Id'

const isId = defn('isId', is(Id))

export default isId
