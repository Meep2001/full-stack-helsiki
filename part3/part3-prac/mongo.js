const mongoose = require('mongoose')
const url = 'mongodb://localhost/notesApp'

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})
const Note = mongoose.model('Note', noteSchema)
// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log("connected");
//     const note = new Note({
//       content: "A new Note",
//       date: new Date(),
//       important: true,
//     });
//     return note.save();
//   })
//   .then((result) => {
//     console.log("note saved");
//     return mongoose.connection.close();
//   })
//   .catch((error) => console.log(error));

mongoose.connect(url).then((res) => {
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note)
    })
    mongoose.connection.close()
  })
})
