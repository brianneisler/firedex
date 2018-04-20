import { curry } from 'ramda'

const newId = curry((database) =>
  database.ref('/').push())

export default newId
