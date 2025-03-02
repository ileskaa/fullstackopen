import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
    // Suoritetaan efekti vain ensimmäisen renderöinnin jälkeen
  }, []);

  const replacementConfirmation = () =>
    window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    );

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const updateNumber = (id) => {
    const updatedPerson = {
      name: newName,
      number: newNumber,
      id,
    };
    return personService.update(id, updatedPerson);
  };

  const showTemporaryMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
      setError(false);
    }, 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.find((person) => person.name === newName);
    if (found) {
      if (replacementConfirmation()) {
        updateNumber(found.id)
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id === found.id ? response.data : person
            );
            setPersons(updatedPersons);
            showTemporaryMessage(`Updated the number of ${found.name}`);
          })
          .catch(() => {
            setError(true);
            showTemporaryMessage(
              `Information of ${found.name} has already been removed from the server`
            );
          });
      }
      return;
    }

    const personObj = {
      name: newName,
      number: newNumber,
      id: "" + (persons.length + 1),
    };

    personService.create(personObj).then((response) => {
      setPersons(persons.concat(response.data));
    });

    showTemporaryMessage(`Added ${newName}`);

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const [filter, setNewFilter] = useState("");

  const personsToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter))
    : persons;

  const filterPersons = (event) => {
    setNewFilter(event.target.value);
  };

  const removePerson = (id) => {
    const match = persons.find((person) => person.id === id);
    personService.del(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      showTemporaryMessage(`Removed ${match.name}`);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={filter} filterPersons={filterPersons} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
