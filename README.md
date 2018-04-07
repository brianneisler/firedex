# firedex - Functionally driven object modeling framework for Firebase's realtime database

This library offers a simpler and more familiar way of using firebase's realtime database.

## Features
- provides a mechanism for declaring schemas to use with the firebase realtime database
- allows for multi removal, set and updates to paths in the firebase Realtime database
- allows for querying for and finding values using more than one condition ( where x = value AND y = otherValue )
- offers a better mechanism for expressing firebase security rules and automatically converts the Schema to matching rules
- allows for securely exposing indexed fields on a value while not exposing the entire value
- allows for a simpler mechanism for performing updates on multiple values
- offers a method for populating queries with cross referenced schemas


## Example
```js
// User.js

import { defindex, defpath, extend } from 'firedex/schema'
import { Entity, String } from 'firedex/schemas'

const User = extend(Entity, 'User', { // extends the built in type of Entity
  path: defpath('/users/$id'),
  props: {
    username: String
  },
  indexes: [
    defindex({
      'username': defindex.ASC
    }, {
      unique: true  // Defines this index as unique and prevents duplicates
    })
  ]
})

export default User
```


# Documentation

## query methods

### create
TODO

### find
TODO

### findOne
TODO

### generate
TODO

### query
TODO

### ref
TODO

### remove
TODO

### set
TODO

### transaction
TODO

### update
TODO


## schema methods

### defindex
TODO

### defn
TODO

### defpath
TODO

### defref
TODO

### defschema
TODO

### extend
TODO


## types

### extend
TODO
