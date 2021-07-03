import assert from 'assert'
import { move } from './move.js'

const validMoves = ['up', 'down', 'left', 'right']

const result = move()
assert.ok(validMoves.includes(result.move))
