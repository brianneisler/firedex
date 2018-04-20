import { join } from 'ramda'
import defschema from '../schema/defschema'

const Enum = {}

Enum.of = (values) => defschema(`Enum<${join(',', values)}>`, {
  values
  // validate
})

export default Enum
