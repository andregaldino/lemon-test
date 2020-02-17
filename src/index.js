const { calc } = require('./taxes')

const total = process.argv[2]
const response = calc(total)

console.log(`${response.kwh} KWH`)
console.log(`${response.icms}% ICMS`)
console.log(`${response.cip} COSIP`)
