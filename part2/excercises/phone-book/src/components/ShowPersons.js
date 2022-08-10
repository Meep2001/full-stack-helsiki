import Person from "./Person";
const ShowPersons = ({ filterPersons ,deletePerson}) => {
    
  return filterPersons.map((person) => (
    <Person
      key={person.name}
      name={person.name}
      id={person.id}
      number={person.number}
     handleDelete={deletePerson}
    ></Person>
  ));
};
export default ShowPersons;
