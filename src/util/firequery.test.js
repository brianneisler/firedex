import firequery from './firequery'
import { cleanupTestApp, initTestApp } from '../test'

let app
let database
beforeEach(async () => {
  app = await initTestApp()
  database = app.database()
})

afterEach(async () => {
  await cleanupTestApp(app)
})

test('empty conditions finds all values', async () => {
  const testData = {
    items: {
      id1: {
        value: 'a'
      },
      id2: {
        value: 'b'
      }
    }
  }
  await app.database()
    .ref(`${app.namespace}`)
    .set(testData)

  const result = await firequery(database, {
    conditions: {},
    path: {
      parts: [
        app.namespace,
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

test('empty conditions with wild id path finds all values above id', async () => {
  const testData = {
    items: {
      id1: {
        value: 'a'
      },
      id2: {
        value: 'b'
      }
    }
  }
  await app.database()
    .ref(`${app.namespace}`)
    .set(testData)

  const result = await firequery(database, {
    conditions: {},
    path: {
      parts: [
        app.namespace,
        'items',
        '$id'
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

test('conditions with id path only finds specific value', async () => {
  const testData = {
    items: {
      id1: {
        value: 'a'
      },
      id2: {
        value: 'b'
      }
    }
  }
  await app.database()
    .ref(`${app.namespace}`)
    .set(testData)

  const result = await firequery(database, {
    conditions: {
      id: 'id1'
    },
    path: {
      parts: [
        app.namespace,
        'items',
        '$id'
      ]
    }
  })
    .exec()
    .once('value')
    .then((snapshot) => snapshot.val())

  expect(result).toEqual({
    value: 'a'
  })
})
