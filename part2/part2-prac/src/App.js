import { Note } from "./components/Note";
import { useState } from "react";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");
  const addNote = (e) => {
    e.preventDefault();
    const newNoteObj = {
      content: newNote,
      id: notes.length + 1,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    setNotes(notes.concat(newNoteObj));

    setNewNote("");
  };
  const [showAll,setShowAll]=useState(true);
  const notesToShow= showAll?notes:notes.filter(note=>note.important);
  const handleOnChnage = (e) => {
    setNewNote(e.target.value);
  };
  return (
    <>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note}></Note>
        ))}
      </ul>
      <button onClick={()=>setShowAll(!showAll)}>
          show {showAll?"important":"all"}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleOnChnage} />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default App;
