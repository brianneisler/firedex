import { join } from 'path'
import { append, isNil } from 'ramda'

const fireref = (database, path) => {
  let parts = [ '/' ]
  if (!isNil(database.namespace)) {
    parts = append(database.namespace, parts)
  }
  parts = append(path, parts)
  return database.ref(join(...parts))
}

export default fireref
