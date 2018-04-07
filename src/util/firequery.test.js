import uuid from 'uuid/v1'
import firequery from './firequery'
import { authAnonymously, initTestApp } from '../test'

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
    .ref(`${namespace}`)
    .set(testData)

  const result = await firequery(database, {
    conditions: {},
    path: {
      parts: [
        namespace,
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
    .ref(`${namespace}`)
    .set(testData)

  const result = await firequery(database, {
    conditions: {},
    path: {
      parts: [
        namespace,
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
    .ref(`${namespace}`)
    .set(testData)

  const result = await firequery(database, {
    conditions: {
      id: 'id1'
    },
    path: {
      parts: [
        namespace,
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
