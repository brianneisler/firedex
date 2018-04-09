/* eslint-disable */
import { keys } from 'ramda'
import { defschema, extend } from './schema'
import { cleanupTestApp, initTestApp } from './test'
import * as schemas from './schemas'
import generate from './generate'


let app
let testDatabase
beforeEach(async () => {
  app = await initTestApp()
  testDatabase = app.database()
})

afterEach(async () => {
  await cleanupTestApp(app)
})

test('placeholder', () => {
  expect(true).toBe(true)
})
