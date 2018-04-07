import { keys, prop, reduce } from 'ramda'
import generate from '../generate'
import defschema from '../schema/defschema'

const ObjectSchema = defschema('Object', {
  generate: (database, schema, opType, prevValue, data) => {
    const props = prop('props', schema)

    // if opType is remove then data will be empty
    // if opType is set and data is null then it's the same as a remove

    return reduce((generatedData, propName) => {
      const propSchema = prop(propName, props)
      const propData = prop(propName, data)
      const propPrevValue = prop(propName, prevValue)
      const result = generate(database, propSchema, opType, propPrevValue, propData)
      if (opType === 'update')
    }, keys(props))
  }
})

export default ObjectSchema
