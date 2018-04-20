import { join } from 'ramda'
import defschema from '../schema/defschema'

const MaxWordString = {
  of: (number) => {
    return defschema(`MaxWordString<number>`, {
      number
      // validate
    })
  }
}

export default MaxWordString
