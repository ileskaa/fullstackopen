const Persons = ({ personsToShow, removePerson }) => {
  return personsToShow.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button
        onClick={() => {
          if (window.confirm(`Delete ${person.name}?`)) removePerson(person.id);
        }}
      >
        delete
      </button>
    </div>
  ));
};

export default Persons;
