var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Users = require('../models/users')

router.post('/', async (req, res) => {
  const { username, password, emoji } = req.body

  try {
    const newUser = new Users({
      username,
      password: await bcrypt.hash(password, 10),
      emoji,
    })
    await newUser.save()

    return res.status(201).json('Created new user successfully!')
  } catch (error) {
    console.log(error)
    return res.status(500).json('Cant create user')
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await Users.findOne({ username })
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Login failed' })
    }

    const token = jwt.sign(
      {
        username: user.username,
      },
      'ratzSecret'
    )

    return res.status(200).json({
      message: `${user.username} logged in`,
      emoji: user.emoji,
      token,
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
