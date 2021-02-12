const Users = require('../../models/users')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    if (!req.headers['authorization']) {
      return res.status(400).json({ message: ' No access token provided! ' })
    }

    const token = req.headers['authorization'].split(' ')

    if (token[0] !== 'Bearer') {
      return res.status(400).json({ message: ' Inválid token ' })
    }

    const user = await jwt.verify(token[1], 'ratzSecret')

    req.body.user = await Users.findOne({ username: user.username })

    next()
  } catch (error) {
    return res.status(400).json({ message: ' Inválid token ' })
  }
}
