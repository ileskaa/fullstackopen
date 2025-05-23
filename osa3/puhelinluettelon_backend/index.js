const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
// morgan middleware käyttöön
morgan.token("post", function (req, res) {
  if (req.method === "POST") {
    const body = JSON.stringify(req.body);
    return body;
  }
  return " ";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  response.send(
    "<div>Phonebook has info for " +
      persons.length +
      " people</div>" +
      "<div>" +
      new Date() +
      "</div>"
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) response.json(person);
  else response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  // 204 No Content
  response.status(204).end();
});

const generateId = () => {
  const id = Math.floor(Math.random() * 10 ** 9);
  return String(id + 1);
};

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.name || !person.number)
    return response.status(400).json({
      error: "name or number missing",
    });

  const names = persons.map((person) => person.name);
  if (names.includes(person.name))
    return response.status(400).json({
      error: "name already in phone book",
    });

  person.id = generateId();
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
