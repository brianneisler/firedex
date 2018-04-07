import { keys } from 'ramda'
import uuid from 'uuid/v1'
import { defpath, defschema } from './schema'
import { authAnonymously, initTestApp } from './test'
import { String } from './schemas'
import create from './create'

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

test('can create using a schema that only has a path', async () => {
  const Test = defschema('Test', {
    path: defpath(`${namespace}/test`)
  })
  const testValue = {
    value: 'a'
  }

  const pushResult = await create(database, Test, testValue)
  const querySnap = await database.ref(`${namespace}/test`).once('value')

  expect(pushResult).toEqual(undefined)

  const data = querySnap.val()
  expect(data).toEqual(testValue)
})
