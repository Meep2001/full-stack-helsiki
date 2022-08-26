const { request, response } = require("express");
const express = require("express");

let personsArray = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "a",
    number: "1",
    id: 10,
  },
  {
    name: "an",
    number: "9",
    id: 11,
  },
  {
    name: "as",
    number: "12",
    id: 12,
  },
];

const gernerateId = () => {
  return Math.floor(Math.random() * 1000 + 1) % 1001;
};
const Contact = require("./models/contact");
const morgan = require("morgan");
const note = require("../../part3-prac/models/note");
const app = express();
app.use(express.json());
morgan.token("log", function ss(req, res) {
  if (req.method === "POST")
    return `{ name:${req.body.name},number:${req.body.number}}`;
  return "";
});
app.use(morgan(":method :url :status :response-time :log"));
app.get("/", (request, response) => {
  response.send("<h3>HELLO</h3>");
});
app.get("/api/persons", (request, response) => {
  Contact.find({}).then((persons) => {
    personsArray = persons;
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  response.send(`<h4>Phone book has info ${personsArray.length} people</h4>
    <p>${new Date().toString()}</p>`);
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Contact.findById(id)
    .then((result) => response.json(result))
    .catch((error) => {
      console.log(error.name);
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Contact.findByIdAndRemove(id)
    .then((contact) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.number || !body.name)
    return response.status(400).end("number or name is empty");
  const person = new Contact({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((result) => response.json(result))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const contact = {
    name: body.name,
    number: body.number,
  };
  Contact.findByIdAndUpdate(id, contact, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log("error handler", error.name);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
