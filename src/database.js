import { mapObjIndexed } from 'ramda'
import create from './create'
import find from './find'
import findOne from './findOne'
import generate from './generate'
import newId from './newId'
import query from './query'
import ref from './ref'
import remove from './remove'
import removeOne from './removeOne'
import set from './set'
import setOne from './setOne'
import update from './update'
import updateOne from './updateOne'

const database = (_database) => ({
  newId,
  ...mapObjIndexed((fn) => fn(_database), {
    create,
    find,
    findOne,
    generate,
    query,
    ref,
    remove,
    removeOne,
    set,
    setOne,
    update,
    updateOne
  })
})

export default database
