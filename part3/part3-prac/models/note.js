require('dotenv').config()
const config=require('../utils/config')
const logger=require('../utils/logger')
const mongoose = require('mongoose')

const url = config.MONGODB_URI

logger.info('connecting to ', url)

mongoose
  .connect(url)
  .then((result) => {
    logger.info('Connected to mongoDB')
  })
  .catch((error) => {
    logger.error('error occured while connecting :', error.message)
  })

const noteSchema=new mongoose.Schema({
  content:{
    type:String,
    minLength:5,
    required:true
  },
  date:{
    type:String,
    required:true
  },
  important:Boolean
})

noteSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id=returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports=mongoose.model('Note',noteSchema)