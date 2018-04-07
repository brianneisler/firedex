import defn from '../schema/defn'
import defschema from '../schema/defschema'

const validate = defn()

const Id = defschema('Id', {
  generate: (database, schema, opType, prevValue, data) => {
    if (!prevValue) {
      if (opType === 'create' || opType === 'set') {
        return database.ref().push().key
      }
    }
    return data
  },
  validate
})

export default Id
