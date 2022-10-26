const mongoose=require('mongoose')
const supertest=require('supertest')
const helper=require('./tests_helper')
const app=require('../app')
const Note=require('../models/note')

const api=supertest(app)


beforeEach(async () => {
  await Note.deleteMany({})

  // Prolematic
  // helper.initialNotes.forEach(async (note) => {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  //   console.log('saved')
  // })
  // console.log('done')

  // First Approach : Parallel Execution
  // const noteObjects=helper.initialNotes.map(n => new Note(n))
  // const promiseArray=noteObjects.map(n => n.save())
  // await Promise.all(promiseArray)

  // Second Approacg : Execution in Order
  for(let note of helper.initialNotes){
    let noteObject=new Note(note)
    await noteObject.save()
  }
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json',async () => {
    await api.get('/api/notes')
      .expect(200)
      .expect('Content-type',/application\/json/)
  },2000)

  test('notes are of length 3',async () => {
    const response=  await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
  },2000)

  test('a specific note can be viewed',async () => {
    const notesAtStart=await helper.notesInDb()
    const noteToBeViewed=notesAtStart[0]
    const resultNote=await api.get(`/api/notes/${noteToBeViewed.id}`).expect(200)
      .expect('Content-Type',/application\/json/)

    const parsedNoteToView=JSON.parse(JSON.stringify(noteToBeViewed))
    expect(resultNote.body).toEqual(parsedNoteToView)
  })

  test('note without content is not added',async () => {
    const note={
      important:true
    }
    await api.post('/api/notes').send(note).expect(400)
    const notesAtEnd=await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
  test('a note can be deleted', async () => {
    const notesAtStart=await helper.notesInDb()
    const noteToBeRemoved=notesAtStart[0]
    await api.delete(`/api/notes/${noteToBeRemoved.id}`)
      .expect(204)
    const notesAtEnd=await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(notesAtStart.length-1)
    const contents=notesAtEnd.map(n => n.content)
    expect(contents).not.toContain(noteToBeRemoved.content)
  })
})

test('a valid note be added',async () => {
  const newNote={
    content:'async/await simplifies making async calls',
    important:true
  }
  await api.post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type',/application\/json/)

  const notesAtEnd=await helper.notesInDb()
  const contents=notesAtEnd.map(n => n.content)
  expect(contents).toHaveLength(helper.initialNotes.length+1)
  expect(contents).toContain('async/await simplifies making async calls')

})


describe('delete of a note',() => {
  test('the first note is \'a new note...\'',async () => {
    const response=await api.get('/api/notes')
    const contents=response.body.map(r => r.content)
    expect(contents).toContain('A new note perhaps')
  },2000)
})





afterAll(() => {
  mongoose.connection.close()
})