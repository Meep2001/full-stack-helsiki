import { useState, useEffect } from "react";
import ShowPersons from "./components/ShowPersons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";
import contactService from "./services/contacts";
import { Notification } from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPersons, setFilterPersons] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [message, setMessage] = useState({ messageN: null, error: false });
  useEffect(() => {
    contactService.getAll().then((contacts) => setPersons(contacts));
  }, []);
  const addPerson = (e) => {
    e.preventDefault();
    let personExists = persons.filter(
      (person) => person.name === newPerson.name
    );
    personExists = personExists.length === 1 ? personExists[0] : null;
    if (personExists && personExists.number === newPerson.number) {
      alert(`${newPerson.name} already exists`);
    } else if (personExists && personExists.number !== newPerson.number) {
      const isUpdate = window.confirm(
        `${personExists.name} already exists,replace the old number with new one`
      );
      if (isUpdate) {
        const updatedPerson = { ...personExists, number: newPerson.number };
        contactService
          .updatePerson(updatedPerson.id, updatedPerson)
          .then((uPerson) => {
            setPersons(
              persons.map((persone) =>
                persone.id === updatedPerson.id ? uPerson : persone
              )
            );
            setMessage({
              messageN: "Updated number successfully",
              error: "false",
            });
            setTimeout(() => setMessage({ messageN: null, error: null }), 5000);
          });
      }
    } else {
      contactService.addNewPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage({
          messageN: "successfully added new person",
          error: "false",
        });
       setTimeout(() => setMessage({ messageN: null, error: null }), 5000);
      });
    }
    setNewPerson({ name: "", number: "" });
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

  const deletePerson = (id) => {
    contactService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));

        setMessage({ messageN: "deletion successful", error: "false" });
        setTimeout(() => setMessage({ messageN: null, error: false }), 5000);
      })
      .catch((error) => {
        setMessage({ messageN: "person already deleted", error: "true" });
        setTimeout(() => setMessage({ messageN: null, error: false }), 5000);
      });
  };

  const onNumberChange = (e) =>
    setNewPerson({ name: newPerson.name, number: e.target.value });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageN={message.messageN} error={message.error}></Notification>
      filter with shown:
      <Filter
        filterText={filterText}
        handleFilterChange={handleFilterChange}
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
      {filterText === "" && (
        <ShowPersons
          filterPersons={persons}
          deletePerson={deletePerson}
        ></ShowPersons>
      )}
      {filterText !== "" && (
        <ShowPersons
          filterPersons={filterPersons}
          deletePerson={deletePerson}
        ></ShowPersons>
      )}
    </div>
  );
};

export default App;
