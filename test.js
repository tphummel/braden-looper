'use strict'

const tap = require('tap')

const { move } = require('./index.js')

tap.test('move returns a valid move', function (t) {
  const validMoves = ['up', 'down', 'left', 'right']

  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 4,
        y: 4
      }
    }
  }

  const result = move(game)
  t.ok(validMoves.includes(result.move))

  t.end()
})

tap.test('avoid hitting the north wall', function (t) {
  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 1,
        y: 10
      }
    }
  }

  const expected = 'left'
  const result = move(game)
  t.equal(result.move, expected)

  t.end()
})

tap.test('avoid hitting the west wall', function (t) {
  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 0,
        y: 5
      }
    }
  }

  const expected = 'up'
  const result = move(game)
  t.equal(result.move, expected)

  t.end()
})

