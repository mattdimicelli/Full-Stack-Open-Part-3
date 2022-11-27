const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());  

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (persons.find(p => p.name === name)) {
    res.status(400).json({ error: 'name must be unique' });
  }
  else if (name && number) {
    const entry = { name, number };
    const id = Math.floor(Math.random() * 10000000);
    entry.id = id;
    persons.push(entry);
    res.json(entry);
  }
  else if (!name && !number) {
    res.status(400).json({ error: 'name and number required'});
  }
  else if (!name) {
    res.status(400).json({ error: 'name required'});
  }
  else if (!number) {
    res.status(400).json({ error: 'number required'});
  }
  
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  }
  else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  if (persons.find(p => p.id === id)) {
    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
  }
  else {
    res.status(404).end();
  }
});

app.get('/info', (req, res) => {
  const html = `<p>The phonebook has ${persons.length} entries.</p><p>${Date()}</p>`;
  res.send(html);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
