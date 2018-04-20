import { dropLast, has, keys, last, length, tail, values } from 'ramda'
import fireref from './fireref'
import hasWilds from './hasWilds'
import isWild from './isWild'
import omitWilds from './omitWilds'
import parseParts from './parseParts'
import pickWilds from './pickWilds'
import resolvePathParts from './resolvePathParts'

const firequery = (database, model) => {
  const { conditions, limitToFirst, limitToLast, path } = model
  const exec = () => {
    const parts = parseParts(path)
    const wildConditions = pickWilds(parts, conditions)
    const queryConditions = omitWilds(parts, conditions)
    let pathParts = parts

    if (hasWilds(parts)) {
      const idPart = last(parts)
      if (isWild(idPart)) {
        const idName = tail(idPart)
        if (has(idName, wildConditions)) {
          // This is an id based query
          return fireref(database, resolvePathParts(parts, conditions))
        }

        // we don't have the id, so now we're trying to filter
        // based on other properties. At this point we can drop
        // the id part
        pathParts = dropLast(1, parts)
      }
    }

    const resolvedPath = resolvePathParts(pathParts, wildConditions)
    const queryConditionsLength = length(keys(queryConditions))

    if (queryConditionsLength === 1) {
      const child = keys(queryConditions)[0]
      const value = values(queryConditions)[0]
      const ref = fireref(database, resolvedPath)
        .orderByChild(child)
        .equalTo(value)
      if (limitToFirst) {
        return ref.limitToFirst(limitToFirst)
      } else if (limitToLast) {
        return ref.limitToLast(limitToLast)
      }
      return ref
    }
    // else if (queryConditionsLength > 1) {
    //
    // }

    // This handles the case where there are no conditions
    return fireref(database, resolvedPath)
  }

  return {
    exec
  }
}

export default firequery
