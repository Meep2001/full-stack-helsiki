import {Note} from './components/Note'

const App = ({ notes }) => {
  return (
    <ul>
      {notes.map((note) => 
        <Note key={note.id} note={note}></Note>
      )}
    </ul>
  );
};

export default App;
