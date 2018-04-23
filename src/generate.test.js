import { defschema } from './schema'
import { cleanupTestApp, initTestApp } from './test'
import * as schemas from './schemas'
import generate from './generate'


describe('generate', () => {
  let app
  let testDatabase
  beforeEach(async () => {
    app = await initTestApp()
    testDatabase = app.database()
  })

  afterEach(async () => {
    await cleanupTestApp(app)
  })

  test('generate returns data if no generate method exists on schema', () => {
    const TestNoGenerate = defschema('TestNoGenerate', {})
    const testData = {}
    const result = generate(testDatabase, TestNoGenerate, 'create', undefined, testData)
    expect(result).toBe(testData)
  })

  test('generate is properly called on a basic type', () => {
    const testPrevValue = undefined
    const testData = {
      value: 'foo'
    }
    const Test = defschema('Test', {
      props: {
        value: schemas.String,
        gen: schemas.String
      },
      generate: (database, schema, opType, prevValue, data) => {
        expect(database).toBe(testDatabase)
        expect(schema).toBe(Test)
        expect(opType).toEqual('create')
        expect(prevValue).toBe(testPrevValue)
        expect(data).toBe(testData)
        return {
          ...data,
          gen: 'bar'
        }
      }
    })

    const result = generate(testDatabase, Test, 'create', testPrevValue, testData)
    expect(result).toEqual({
      value: 'foo',
      gen: 'bar'
    })
  })
})
