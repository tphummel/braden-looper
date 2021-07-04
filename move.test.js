const assert = require('assert')
const { move } = require('./index.js')

const validMoves = ['up', 'down', 'left', 'right']

const result = move()
assert.ok(validMoves.includes(result.move))
