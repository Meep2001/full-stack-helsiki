import { Note } from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import axios from "axios";
import Notification from "./components/Notification";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
 
  const hook = () => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  };
  useEffect(hook, []);

  const addNote = (e) => {
    e.preventDefault();
    const newNoteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService.create(newNoteObj).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const handleOnChnage = (e) => {
    setNewNote(e.target.value);
  };
  const toggleImportanceOf = (id) => {
    let changedNote = notes.find((note) => note.id === id);
    changedNote = { ...changedNote, important: !changedNote.important };
    noteService.update(id, changedNote)
    .then((returnedNote) => {
      setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
    }).catch(error=>{
      setErrorMessage(
        `the note ${changedNote.content} is deleted from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
      setNotes(notes.filter(note=>note.id!==id))
    });
  };
  return (
    <>
     <Notification errorMessage={errorMessage}></Notification>
     
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          ></Note>
        ))}
      </ul>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleOnChnage} />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default App;
