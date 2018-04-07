import extend from '../schema/extend'
import _Object from './Object'
import Timestamp from './Timestamp'
import TimestampCreated from './TimestampCreated'


const Timestamped = extend(_Object, 'Timestamped', {
  props: {
    createdAt: TimestampCreated,
    updatedAt: Timestamp
  }
})

export default Timestamped
