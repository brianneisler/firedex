import { defschema, extend } from '../schema'
import { cleanupTestApp, initTestApp } from '../test'
import ObjectSchema from './Object'
import String from './String'
import generate from '../generate'


describe('Object', () => {
  let app
  let testDatabase
  beforeEach(async () => {
    app = await initTestApp()
    testDatabase = app.database()
  })

  afterEach(async () => {
    await cleanupTestApp(app)
  })


  test('generates a basic Object, does not lose props, and does not include undefined properties', async () => {
    const testPrevValue = undefined
    const testData = {
      value: 'foo'
    }
    const TestGen = defschema('TestGen', {
      generate: () => 'bar'
    })
    const TestGenUndefined = defschema('TestGenUndefined', {
      generate: () => undefined
    })
    const Test = extend(ObjectSchema, 'Test', {
      props: {
        value: String,
        gen: TestGen,
        skip: TestGenUndefined
      }
    })

    const result = generate(testDatabase, Test, 'create', testPrevValue, testData)
    expect(result).toEqual({
      value: 'foo',
      gen: 'bar'
    })
  })

  test('passes data through if props is not defined', async () => {
    const testPrevValue = undefined
    const testData = {
      value: 'foo'
    }
    const Test = extend(ObjectSchema, 'Test', {

    })

    const result = generate(testDatabase, Test, 'create', testPrevValue, testData)
    expect(result).toEqual({
      value: 'foo'
    })
  })
})
