import { mapObjIndexed } from 'ramda'
import find from './find'
import findOne from './findOne'
import generate from './generate'
import newId from './newId'
import push from './push'
import query from './query'
import ref from './ref'
import remove from './remove'
import set from './set'
import update from './update'

const database = (_database) => ({
  newId,
  ...mapObjIndexed((fn) => fn(_database), {
    find,
    findOne,
    generate,
    push,
    query,
    ref,
    remove,
    set,
    update
  })
})

export default database
