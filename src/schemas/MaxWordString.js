import defschema from '../schema/defschema'

const MaxWordString = {
  of: (number) => defschema(`MaxWordString<${number}>`, {
    number
    // validate
  })
}

export default MaxWordString
