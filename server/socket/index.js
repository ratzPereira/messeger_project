const jwt = require('jsonwebtoken')
const Users = require('../models/users')

module.exports = async (socket) => {
  try {
    const token = socket.request._query['token']
    const username = await jwt.verify(token, 'ratzSecret')
    const user = await Users.findOne({ username })
  } catch (error) {
    console.log(error)
  }
}
