const getSnapshotChildren = (snapshot) => {
  const children = {}
  snapshot.forEach((child) => {
    children[child.key] = child
  })
  return children
}

export default getSnapshotChildren
