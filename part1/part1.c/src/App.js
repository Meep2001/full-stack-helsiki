import { useState } from "react";

function App() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [all, setAll] = useState([]);

  const handleLeft = () => {
    setLeft(left + 1); setAll(all.concat("L"));
  };
  const handleRight = () => {
    setRight(right + 1); setAll(all.concat("R"));
  };

  return (
    <div>
      <Button handleClick={handleLeft} text={"LEFT"}></Button>
      <Button handleClick={handleRight} text={"Right"}></Button>
      <History allClicks={all}></History>
      <Part1_d></Part1_d>
    </div>
  );
}

const Button=({handleClick,text})=>{
  return <button onClick={handleClick}>{text}</button>
}

const History=(props)=>{
  if(props.allClicks.length===0)
    return(
      <>This will show history of button click</>
    )
  return (
    <>button press history {props.allClicks.join(' ')}</>
  )
}

const Part1_d=()=>{
  const [value,setValue]=useState(0);
  const newValue=(nvalue)=>()=>{
    console.log('New Value',nvalue);
    setValue(nvalue)
  }
  return <div>
  {value}
  <button onClick={newValue(1000)}>1000</button>
  <button onClick={newValue(0)}>0</button>
  <button onClick={newValue(-100)}>-100</button>
  
  </div>
}
export default App;
