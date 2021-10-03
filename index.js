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
  const atEastWall = you.head.x + 1 === board.width
  const atSouthWall = you.head.y === 0
  const atNorthWestCorner = atNorthWall && atWestWall
  const atSouthWestCorner = atSouthWall && atWestWall
  const atSouthEastCorner = atSouthWall && atEastWall
  const atNorthEastCorner = atNorthWall && atEastWall

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
  } else if (atSouthEastCorner) {
    if (movingSouth) {
      move = 'left'
    } else if (movingEast) {
      move = 'up'
    }
  } else if (atNorthEastCorner) {
    if (movingNorth) {
      move = 'left'
    } else if (movingEast) {
      move = 'down'
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
  } else if (atSouthWall) {
    if (movingWest) {
      move = 'left'
    } else if (movingEast) {
      move = 'right'
    } else if (movingSouth) {
      move = 'right'
    }
  } else if (atEastWall) {
    if (movingSouth) {
      move = 'down'
    } else if (movingNorth) {
      move = 'up'
    } else if (movingEast) {
      move = 'up'
    }
  } else {
    move = 'up'
  }

  return { move, shout }
}

const isCloudFlareWorker = typeof addEventListener !== 'undefined' && addEventListener // eslint-disable-line

if (isCloudFlareWorker) {
  addEventListener('fetch', event => { // eslint-disable-line
    event.respondWith(handleRequest(event))
  })

  async function handleRequest (event) {
    const { request } = event
    const { pathname } = new URL(request.url)
    const cf = event.request.cf !== undefined ? event.request.cf : {}
    const headers = new Map(request.headers)

    const eventData = {
      battlesnake: BATTLESNAKE_NAME, // eslint-disable-line
      req_method: event.request.method,
      req_pathname: pathname,
      req_lat: cf.latitude,
      req_lon: cf.longitude,
      req_continent: cf.continent,
      req_country: cf.country,
      req_region: cf.region,
      req_city: cf.city,
      req_timezone: cf.timezone,
      req_region_code: cf.regionCode,
      req_metro_code: cf.metroCode,
      req_postal_code: cf.postalCode,
      req_colo: cf.colo,
      req_cf_ray: headers.get('cf-ray')
    }

    if (request.method === 'GET') {
      console.log('GET /')
      console.log(new Map(request.headers))

      const body = {
        apiversion: '1',
        author: 'tphummel',
        color: '#888888',
        head: 'viper',
        tail: 'rattle',
        version: '2021-07-07'
      }

      event.waitUntil(postLog(eventData))

      return new Response(JSON.stringify(body), { // eslint-disable-line
        status: 200,
        headers: {
          'content-type': 'application/json;charset=UTF-8'
        }
      })
    }

    if (request.method !== 'POST') {
      event.waitUntil(postLog(eventData))
      return new Response('Not Found', { status: 404 }) // eslint-disable-line
    }

    if (pathname.startsWith('/start')) {
      console.log('POST /start')
      console.log(new Map(request.headers))

      // const reqBody = await request.text()

      // no response required
      event.waitUntil(postLog(eventData))
      return new Response('OK', { status: 200 }) // eslint-disable-line

    } else if (pathname.startsWith('/move')) {
      console.log('POST /move')
      console.log(new Map(request.headers))

      const reqBodyTxt = await request.text()
      const reqBody = JSON.parse(reqBodyTxt)

      const resBody = move(reqBody)

      event.waitUntil(postLog(eventData))

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
      event.waitUntil(postLog(eventData))
      return new Response('OK', { status: 200 }) // eslint-disable-line
    } else {
      event.waitUntil(postLog(eventData))
      return new Response('Not Found', { status: 404 }) // eslint-disable-line
    }
  }

  function postLog (data) {
    console.log('sending event to honeycomb')
    return fetch('https://api.honeycomb.io/1/events/' + encodeURIComponent(HONEYCOMB_DATASET), { // eslint-disable-line
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers([['X-Honeycomb-Team', HONEYCOMB_KEY]]) // eslint-disable-line
    })
  }
} else {
  module.exports = { move }
}
