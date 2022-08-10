export const Note = ({note,toggleImportance}) => {
  let  label=note.important?'make not important':'make important';
    return <><li>{note.content}</li>
    <button onClick={toggleImportance}>{label}</button>
    </>
    ;
  };