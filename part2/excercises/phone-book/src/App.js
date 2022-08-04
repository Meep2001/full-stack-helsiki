import { useState } from "react";
import ShowPersons from "./components/ShowPersons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filterPersons, setFilterPersons] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const addPerson = (e) => {
    const personExists = persons.some(
      (person) =>
        person.name === newPerson.name
    );
    if (personExists) {
      alert(`${newPerson.name} already exists`);
    } else setPersons(persons.concat(newPerson));
    setNewPerson({ name: "", number: "" });
    e.preventDefault();
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const NFilterPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterPersons(NFilterPersons);
    setFilterText(value);
  };

  const onNameChange = (e) =>
    setNewPerson({ name: e.target.value, number: newPerson.number });

  const onNumberChange = (e) =>
    setNewPerson({ name: newPerson.name, number: e.target.value });

  return (
    <div>
      <h2>Phonebook</h2>
      filter with shown:
      <Filter
        filterText={filterText}
        handleFilterChange={handleFilterChange  }
      ></Filter>
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        name={newPerson.name}
        number={newPerson.number}
      ></PersonForm>
      <h2>Numbers</h2>
      {filterText === "" && <ShowPersons filterPersons={persons}></ShowPersons>}
      {filterText !== "" && <ShowPersons filterPersons={filterPersons}></ShowPersons>}
    </div>
  );
};

export default App;
