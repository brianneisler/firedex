import getRefPath from './getRefPath'

const getSnapshotPath = (database, snapshot) => getRefPath(database, snapshot.ref)

export default getSnapshotPath
