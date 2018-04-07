import defschema from '../schema/defschema'

const Array = defschema('Array', {

})

Array.of = (schema) => ({
  ...Array,
  schema
})

export default Array
