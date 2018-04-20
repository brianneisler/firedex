import { defpath, defschema } from './schema'
import { cleanupTestApp, initTestApp } from './test'
// import { String } from './schemas'
import set from './set'

let app
let database
beforeEach(async () => {
  app = await initTestApp()
  database = app.database()
})

afterEach(async () => {
  await cleanupTestApp(app)
})

test('sets data when none exists', async () => {
  const Test = defschema('Test', {
    path: defpath(`${app.namespace}/test`)
  })
  const testValue = {
    value: 'a'
  }

  const setResult = await set(database, Test, {}, testValue)
    .then((snapshot) => snapshot.val())

  const data = await database.ref(`${app.namespace}/test`)
    .once('value')
    .then((snapshot) => snapshot.val())

  expect(data).toEqual(testValue)
  expect(setResult).toEqual(data)
}, 10000)


test('sets data when data does exist', async () => {
  const testData = {
    test: {
      value: 'a'
    }
  }
  await app.database()
    .ref(`${app.namespace}`)
    .set(testData)

  const Test = defschema('Test', {
    path: defpath(`${app.namespace}/test`)
  })
  const testValue = {
    value: 'b'
  }

  const setResult = await set(database, Test, {}, testValue)
    .then((snapshot) => snapshot.val())

  const data = await database.ref(`${app.namespace}/test`)
    .once('value')
    .then((snapshot) => snapshot.val())

  expect(data).toEqual(testValue)
  expect(setResult).toEqual(data)
}, 10000)
