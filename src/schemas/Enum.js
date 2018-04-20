import { join } from 'ramda'
import defschema from '../schema/defschema'

const Enum = {}

Enum.of = (values) => {
  return defschema(`Enum<${join(',', values)}>`, {
    values
    // validate
  })
}


export default Enum
