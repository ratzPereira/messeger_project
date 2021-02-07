var express = require('express')
const Users = require('../models/users')
var router = express.Router()
const bcrypt = require('bcrypt')

router.post('/', async (req, res, next) => {
  const { userName, password, emoji } = req.body
  console.log(req.body)
  try {
    const newUser = new Users({
      userName,
      password: bcrypt.hashSync(password, 10),
      emoji,
    })
    await newUser.save()

    return res.status(201).json('Created new user successfully!')
  } catch (error) {
    console.log(error)
    return res.status(500).json('Cant create user')
  }
})

module.exports = router
