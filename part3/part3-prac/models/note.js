require('dotenv').config()
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => {
    console.log(`error occured while connecting :`, error.message);
  });

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
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
  })

  module.exports=mongoose.model('Note',noteSchema)