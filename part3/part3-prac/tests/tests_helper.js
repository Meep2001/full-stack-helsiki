const Note = require('../models/note')
const User = require('../models/user')
const initialNotes=[
  {
    content:'HTML is easy',
    important:false,
    date:new Date()
  },
  {
    content:'A new note perhaps',
    important:true,
    date:new Date()
  }
]

const nonExistingId=async () => {
  const note=new note({ content:'willRemoveThissoon',date:new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb=async () => {
  const notes=await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb=async () => {
  const users=await User.find({})
  return users.map(user => user.toJSON())
}

module.exports={
  initialNotes,nonExistingId,notesInDb,usersInDb
}