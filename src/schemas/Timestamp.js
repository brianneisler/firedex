import firebase from 'firebase'
import defschema from '../schema/defschema'

const Timestamp = defschema('Timestamp', {
  generate: (database, schema, prevValue, value) =>
    value || firebase.database.ServerValue.TIMESTAMP
})

export default Timestamp
