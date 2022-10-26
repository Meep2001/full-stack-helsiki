/* eslint-disable linebreak-style */
const notesRouter=require('express').Router()
const { response } = require('express')
const Note=require('../models/note')
const User=require('../models/user')

notesRouter.get('/',async (request,response) => {

  const notes=await Note.find({}).populate('user',{ username:1,name:1 })

  return response.json(notes)
  // Note.find({}).then(notes => {
  //   response.json(notes)
  // })
})

notesRouter.get('/:id',async (request,response,next) => {
  const note=await Note.findById(request.params.id)
  if(note) return response.json(note)
  else return response.status(404).end()
  // Note.findById(request.params.id)
  //   .then((note) => {
  //     if (note) return response.json(note)
  //     else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch((error) => {
  //     next(error)
  //   })
})

notesRouter.post('/',async (request,response,next) => {
  const body=request.body
  const user=await User.findById(body.userId)
  const note=new Note({
    content:body.content,
    important:body.important || false,
    date:new Date(),
    user:user._id
  })
  const savedNote=await note.save()
  user.notes=user.notes.concat(savedNote._id)
  await user.save()
  return response.status(201).json(savedNote)
  // note
  //   .save()
  //   .then((savedNote) => {
  //     response.status(201).json(savedNote)
  //   })
  //   .catch((error) => next(error))
})

notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id)
  return response.status(204).end()

  // Note.findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch((error) => next(error))
})

notesRouter.put('/:id',(request,response,next) => {
  const body=request.body
  const note={
    content:body.content,
    important:body.important
  }
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

module.exports=notesRouter