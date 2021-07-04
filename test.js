'use strict'

const tap = require('tap')

const { move } = require('./index.js')

tap.test('move returns a valid move', function (t) {
  const validMoves = ['up', 'down', 'left', 'right']

  const result = move()
  t.ok(validMoves.includes(result.move))

  t.end()
})
