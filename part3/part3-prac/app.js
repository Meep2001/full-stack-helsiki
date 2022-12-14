/* eslint-disable linebreak-style */
const config=require('./utils/config')
const express=require('express')
const app=express()
const cors=require('cors')
const notesRouter=require('./controllers/notes')
const usersRouter=require('./controllers/users')
require('express-async-errors')
const middleware=require('./utils/middleware')
const logger=require('./utils/logger')
const mongoose=require('mongoose')

logger.info('connecting to ',config.PORT)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
    process.exit(1)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes',notesRouter)
app.use('/api/users',usersRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports=app