const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const parts=[
    {part:part1,exercises:exercises1},
    {part:part2,exercises:exercises2},
    {part:part3,exercises:exercises3},  
  ];
  console.log(parts);

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Footer no={exercises1 + exercises2 + exercises3}></Footer>
    </div>
  );
};

function Part(props)
{
  return <p>{props.part.part}  {props.part.exercises}</p>
}
function Footer(props)
{
return <p>Number of exercises {props.no}</p>
}
function Header(props) {
  return <h1>{props.course}</h1>;
}

function Content(props) {
  return (
    <>
      {props.parts.map((item) => (
        <Part part={item}></Part>
      ))}
    </>
  );
}

export default App;
