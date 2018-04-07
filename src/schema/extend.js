import { mergeDeepRight } from 'ramda'
import defschema from './defschema'

const extend = (superschema, name, def) =>
  mergeDeepRight(superschema, defschema(name, def))

export default extend
