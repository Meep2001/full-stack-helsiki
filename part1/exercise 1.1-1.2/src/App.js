const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Footer parts={course.parts}></Footer>
    </div>
  );
};

function Part(props) {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
}
function Footer(props) {
  let count = 0;
  props.parts.forEach((part) => (count += part.exercises));
  return <p>Number of exercises {count}</p>;
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
