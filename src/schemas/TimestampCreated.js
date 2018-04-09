import firebase from 'firebase'
import defschema from '../schema/defschema'

const TimestampCreated = defschema('TimestampCreated', {
  generate: (database, schema, opType, prevValue, value) => {
    if (!value && prevValue) {
      return prevValue
    }
    return value || firebase.database.ServerValue.TIMESTAMP
  }
})

export default TimestampCreated
