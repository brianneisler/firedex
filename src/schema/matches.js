import evaluate from '../util/evaluate'
import defn from './defn'

const matches = defn((value, regex) => {
  return `${evaluate(value)}.matches(${regex.toString()})`
})

export default matches
