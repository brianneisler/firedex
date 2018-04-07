import uuid from 'uuid/v1'
import { defpath, extend } from '../schema'
import push from '../push'
import Entity from './Entity'
import String from './String'
import { authAnonymously, initTestApp } from '../test'

let app
let database
let namespace
beforeEach(async () => {
  namespace = uuid()
  app = initTestApp(namespace)
  database = app.database()
  await authAnonymously(app)
})

afterEach(async () => {
  await database.ref(namespace).remove()
  database.goOffline()
})

test('pushes extension of Entity ', async () => {
  const Test = extend(Entity, 'Test', {
    path: defpath(`${namespace}/test/$id`),
    props: {
      value: String
    }
  })
  const testValue = {
    value: 'a'
  }
  await app.database()
    .ref(`${namespace}`)
    .set(testData)

  const result = await firequery(database, {
    conditions: {},
    path: {
      parts: [
        namespace,
        'items'
      ]
    }
  })
    .exec()
    .once('value')
    .then((snapshot) => snapshot.val())

  expect(result).toEqual({
    id1: {
      value: 'a'
    },
    id2: {
      value: 'b'
    }
  })
})
