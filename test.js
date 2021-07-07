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
      },
      body: [
        { x: 4, y: 4 },
        { x: 4, y: 5 },
        { x: 4, y: 6 }
      ]
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
      },
      body: [
        { x: 1, y: 10 },
        { x: 1, y: 9 },
        { x: 1, y: 8 }
      ]
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
      },
      body: [
        { x: 0, y: 5 },
        { x: 1, y: 5 },
        { x: 2, y: 5 }
      ]
    }
  }

  const expected = 'up'
  const result = move(game)
  t.equal(result.move, expected)

  t.end()
})

tap.test('avoid hitting the northwest corner', function (t) {
  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 0,
        y: 10
      },
      body: [
        { x: 0, y: 10 },
        { x: 1, y: 10 },
        { x: 2, y: 10 }
      ]
    }
  }

  const expected = 'down'
  const result = move(game)
  t.equal(result.move, expected)

  t.end()
})

tap.test('avoid hitting the southwest corner, southbound', function (t) {
  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 0,
        y: 0
      },
      body: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 }
      ]
    }
  }

  const expected = 'right'
  const result = move(game)
  t.equal(result.move, expected)

  t.end()
})

tap.test('avoid hitting the south wall', function (t) {
  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 5,
        y: 0
      },
      body: [
        { x: 5, y: 0 },
        { x: 5, y: 1 },
        { x: 5, y: 2 }
      ]
    }
  }

  const result = move(game)
  const note = 'move left or right when you hit south wall head on'
  t.ok(result.move === 'left' || result.move === 'right', note)
  t.end()
})

tap.test('avoid hitting the southeast corner, eastbound', function (t) {
  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 10,
        y: 0
      },
      body: [
        { x: 10, y: 0 },
        { x: 9, y: 0 },
        { x: 8, y: 0 }
      ]
    }
  }

  const expected = 'up'
  const result = move(game)
  t.equal(result.move, expected)

  t.end()
})

tap.test('survive the northeast corner, northbound', function (t) {
  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 10,
        y: 10
      },
      body: [
        { x: 10, y: 10 },
        { x: 10, y: 9 },
        { x: 10, y: 8 }
      ]
    }
  }

  const expected = 'left'
  const result = move(game)
  t.equal(result.move, expected)

  t.end()
})

tap.test('avoid hitting the northeast corner, eastbound', function (t) {
  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 10,
        y: 10
      },
      body: [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
      ]
    }
  }

  const expected = 'down'
  const result = move(game)
  t.equal(result.move, expected)

  t.end()
})

tap.test('avoid hitting the east wall, southbound', function (t) {
  const game = {
    board: {
      height: 11,
      width: 11
    },
    you: {
      head: {
        x: 10,
        y: 9
      },
      body: [
        { x: 10, y: 9 },
        { x: 10, y: 10 },
        { x: 9, y: 10 }
      ]
    }
  }

  const expected = 'down'
  const result = move(game)
  t.equal(result.move, expected)

  t.end()
})
