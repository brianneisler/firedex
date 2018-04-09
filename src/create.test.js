import { defpath, defschema } from './schema'
import { cleanupTestApp, initTestApp } from './test'
// import { String } from './schemas'
import create from './create'

let app
let database
beforeEach(async () => {
  app = await initTestApp()
  database = app.database()
})

afterEach(async () => {
  await cleanupTestApp(app)
})

test('can create using a schema that only has a path', async () => {
  const Test = defschema('Test', {
    path: defpath(`${app.namespace}/test`)
  })
  const testValue = {
    value: 'a'
  }

  const createResult = await create(database, Test, testValue)
    .then((snapshot) => snapshot.val())
  const data = await database.ref(`${app.namespace}/test`)
    .once('value')
    .then((snapshot) => snapshot.val())

  expect(data).toEqual(testValue)
  expect(createResult).toEqual(data)
})
