function move (reqBody) {

  const { board, you } = reqBody

  const shout = 'shout'
  let move

  const prev = you.body[1]

  const movingNorth = prev.y === you.head.y - 1
  const movingSouth = prev.y === you.head.y + 1
  const movingEast = prev.x === you.head.x - 1
  const movingWest = prev.x === you.head.x + 1

  const atNorthWall = you.head.y + 1 === board.height
  const atWestWall = you.head.x === 0
  const atSouthWall = you.head.y === 0
  const atNorthWestCorner = atNorthWall && atWestWall
  const atSouthWestCorner = atSouthWall && atWestWall

  if (atNorthWestCorner) {
    if (movingNorth) {
      move = 'right'
    } else if (movingWest) {
      move = 'down'
    }
  } else if (atSouthWestCorner) {
    if (movingSouth) {
      move = 'right'
    } else if (movingWest) {
      move = 'up'
    }
  } else if (atNorthWall) {
    if (movingWest) {
      move = 'left'
    } else if (movingEast) {
      move = 'right'
    } else if (movingNorth) {
      move = 'left'
    }
  } else if (atWestWall) {
    if (movingNorth) {
      move = 'up'
    } else if (movingSouth) {
      move = 'down'
    } else if (movingWest) {
      move = 'up'
    }
  } else {
    move = 'up'
  }

  console.log('move:', move)

  return { move, shout }
}

const isCloudFlareWorker = typeof addEventListener !== 'undefined' && addEventListener // eslint-disable-line

if (isCloudFlareWorker) {
  addEventListener('fetch', event => { // eslint-disable-line
    event.respondWith(handleRequest(event.request))
  })

  async function handleRequest (request) {
    const { pathname } = new URL(request.url)

    if (request.method === 'GET') {
      console.log('GET /')
      console.log(new Map(request.headers))

      const body = {
        apiversion: '1',
        author: 'tphummel',
        color: '#888888',
        head: 'default',
        tail: 'default',
        version: '0.0.1-beta'
      }

      return new Response(JSON.stringify(body), { // eslint-disable-line
        status: 200,
        headers: {
          'content-type': 'application/json;charset=UTF-8'
        }
      })
    }

    if (request.method !== 'POST') {
      return new Response('Not Found', { status: 404 }) // eslint-disable-line
    }

    if (pathname.startsWith('/start')) {
      console.log('POST /start')
      console.log(new Map(request.headers))

      // const reqBody = await request.text()

      // no response required
      return new Response('OK', { status: 200 }) // eslint-disable-line

    } else if (pathname.startsWith('/move')) {
      console.log('POST /move')
      console.log(new Map(request.headers))

      const reqBody = await request.text()

      const resBody = move(reqBody)

      return new Response(JSON.stringify(resBody), { // eslint-disable-line
        status: 200,
        headers: {
          'content-type': 'application/json;charset=UTF-8'
        }
      })
    } else if (pathname.startsWith('/end')) {
      console.log('POST /end')
      console.log(new Map(request.headers))

      // no response required
      return new Response('OK', { status: 200 }) // eslint-disable-line
    } else {
      return Response('Not Found', { status: 404 }) // eslint-disable-line
    }
  }
} else {
  module.exports = { move }
}
