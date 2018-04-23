import { defpath, defschema } from './schema'
import { cleanupTestApp, initTestApp } from './test'
import removeOne from './removeOne'


describe('removeOne', () => {
  let app
  let database
  beforeEach(async () => {
    app = await initTestApp()
    database = app.database()
  })

  afterEach(async () => {
    await cleanupTestApp(app)
  })

  test('can remove one using a schema that only has a path with no parameters', async () => {
    const testData = {
      test: {
        value: 'a'
      }
    }
    await app.database()
      .ref(`${app.namespace}`)
      .set(testData)

    const Test = defschema('Test', {
      path: defpath('/test')
    })

    const removeResult = await removeOne(database, Test)
      .then((snapshot) => snapshot.val())
    const data = await database.ref(`${app.namespace}/test`)
      .once('value')
      .then((snapshot) => snapshot.val())

    expect(data).toEqual(null)
    expect(removeResult).toEqual({
      value: 'a'
    })
  })

  test('removes only the first value when multiple match', async () => {
    const testData = {
      test: {
        id1: {
          id: 'id1',
          value: 'a'
        },
        id2: {
          id: 'id2',
          value: 'a'
        },
        id3: {
          id: 'id3',
          value: 'a'
        }
      }
    }
    await app.database()
      .ref(`${app.namespace}`)
      .set(testData)

    const Test = defschema('Test', {
      path: defpath('/test')
    })

    const removeResult = await removeOne(database, Test, { value: 'a' })
      .then((snapshot) => snapshot.val())
    const data = await database.ref(`${app.namespace}/test`)
      .once('value')
      .then((snapshot) => snapshot.val())

    expect(data).toEqual({
      id2: {
        id: 'id2',
        value: 'a'
      },
      id3: {
        id: 'id3',
        value: 'a'
      }
    })
    expect(removeResult).toEqual({
      id: 'id1',
      value: 'a'
    })
  })
})
