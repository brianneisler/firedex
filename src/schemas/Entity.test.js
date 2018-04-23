import { keys, length } from 'ramda'
import { defpath, extend } from '../schema'
import firequery from '../util/firequery'
import create from '../create'
import Entity from './Entity'
import String from './String'
import { cleanupTestApp, initTestApp } from '../test'


describe('Entity', () => {
  let app
  let database
  beforeEach(async () => {
    app = await initTestApp()
    database = app.database()
  })

  afterEach(async () => {
    await cleanupTestApp(app)
  })


  test('creates extension of Entity ', async () => {
    const Test = extend(Entity, 'Test', {
      path: defpath('/test/$id'),
      props: {
        value: String
      }
    })
    const testValue = {
      value: 'a'
    }
    const returned = await create(database, Test, testValue)
      .then((snapshot) => snapshot.val())

    const result = await firequery(database, {
      conditions: {},
      path: {
        parts: [
          'test'
        ]
      }
    })
      .exec()
      .once('value')
      .then((snapshot) => snapshot.val())

    const testKeys = keys(result)
    expect(length(testKeys)).toEqual(1)

    const firstResult = result[testKeys[0]]
    expect(firstResult).toMatchObject({
      createdAt: expect.any(Number),
      id: expect.stringMatching(/^-[a-zA-Z0-9_-]*$/),
      updatedAt: expect.any(Number),
      value: 'a'
    })
    expect(returned).toEqual(firstResult)
  })
})
