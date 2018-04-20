import { curry } from 'ramda'

const newId = (database) =>
  database.ref('/').push()

export default newId
