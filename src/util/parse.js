import { split } from 'ramda'

const parse = (path) => split('/', path)

export default parse
