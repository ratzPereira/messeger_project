var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

//Set up cors
const cors = require('cors')

//Set up DB connection
const mongoose = require('mongoose')
mongoose
  .connect(
    'mongodb+srv://ratz:banana69@cluster0.4j52b.mongodb.net/messenger_app?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected with DB successfully')
  })
  .catch((err) => {
    console.log(err.message)
  })

var app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const userAuth = require('./routes/middleware/authMiddleware')

app.use('/users', usersRouter)
app.use('/', userAuth, indexRouter)

module.exports = app
