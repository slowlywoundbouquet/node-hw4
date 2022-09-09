const express = require('express')
const app = express()
app.use(express.json())
const logger = require('./middleware/logger')
const err404 = require('./middleware/err404')
const userRouter = require('./routes/user')
const booksRouter = require('./routes/books')


app.use(logger)

app.use('/api/user', userRouter)

app.use('/api/books', booksRouter)

app.use(err404)

app.listen(3000)