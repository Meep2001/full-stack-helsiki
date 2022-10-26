require('dotenv').config()
const config=require('../utils/config')
const logger=require('../utils/logger')
const mongoose = require('mongoose')

// const url = config.MONGODB_URI

// logger.info('connecting to ', url)

// const connectToMongoose=async () => {
//   console.log("IN MONGOOSE CONNECT")

//   try {
//     console.log('before try')
//     await mongoose.connect(url)
//     logger.info('Connected to MongoDB')
//     console.log('in try')
//   }
//   catch(error)
//   {
//     logger.error('error occured while connecting :', error.message)
//     process.exit(1)
//   }
// }
// connectToMongoose()

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
  important:Boolean,
  user: {
    type:mongoose.Types.ObjectId,
    ref:'User'
  }
})

noteSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id=returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports=mongoose.model('Note',noteSchema)