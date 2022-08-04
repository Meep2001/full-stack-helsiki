import Person from "./Person";
const ShowPersons = ({ filterPersons }) => {
    
  return filterPersons.map((person) => (
    <Person
      key={person.name}
      name={person.name}
      number={person.number}
    ></Person>
  ));
};
export default ShowPersons;
