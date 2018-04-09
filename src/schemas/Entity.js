import defindex from '../schema/defindex'
import extend from '../schema/extend'
import Id from './Id'
import Timestamped from './Timestamped'

const Entity = extend(Timestamped, 'Entity', {
  props: {
    id: Id
  },
  indexes: [
    defindex({
      id: defindex.ASC
    }, {
      unique: true
    })
  ]
})

export default Entity
