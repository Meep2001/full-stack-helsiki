export const Note = ({note}) => {
    console.log(note.content);
    return <li>{note.content}</li>;
  };