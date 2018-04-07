import { keys } from 'ramda'
import uuid from 'uuid/v1'
import { defpath, defschema } from './schema'
import { authAnonymously, initTestApp } from './test'
import { String } from './schemas'
import set from './create'

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

test('sets data when none exists', async () => {
  const Test = defschema('Test', {
    path: defpath(`${namespace}/test`)
  })
  const testValue = {
    value: 'a'
  }

  const setResult = await set(database, Test, testValue)
  const querySnap = await database.ref(`${namespace}/test`).once('value')

  expect(setResult).toEqual(undefined)

  const data = querySnap.val()
  expect(data).toEqual(testValue)
})


test('sets data when data does exist', async () => {
  const testData = {
    test: {
      value: 'a'
    }
  }
  await app.database()
    .ref(`${namespace}`)
    .set(testData)

  const Test = defschema('Test', {
    path: defpath(`${namespace}/test`)
  })
  const testValue = {
    value: 'b'
  }

  const setResult = await set(database, Test, testValue)
  const querySnap = await database.ref(`${namespace}/test`).once('value')

  expect(setResult).toEqual(undefined)

  const data = querySnap.val()
  expect(data).toEqual(testValue)
})
