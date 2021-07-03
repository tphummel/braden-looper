function move (reqBody) {
  console.log(reqBody)

  const body = {
    move: 'up',
    shout: 'shout'
  }

  return body
}

export { move }
// module.exports = { move }
