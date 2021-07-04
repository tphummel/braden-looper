function move (reqBody) {
  console.log(reqBody)

  const body = {
    move: 'up',
    shout: 'shout'
  }

  return body
}

if (typeof addEventListener !== 'undefined' && addEventListener) { // eslint-disable-line
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
