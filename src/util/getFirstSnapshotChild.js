import { head, pipe, values } from 'ramda'
import getSnapshotChildren from './getSnapshotChildren'

const getFirstSnapshotChild = pipe(
  getSnapshotChildren,
  values,
  head
)

export default getFirstSnapshotChild
