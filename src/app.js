const express = require("express");
const cors = require("cors");
const { v4:uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuidv4(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    return response.status(400).json({ message: 'Id not found!' });
  };
  
  const repository = {
    id: id,
    title,
    url,
    techs,
    likes: repositories[index].likes,
  };

  repositories.splice(index, 1, repository);

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {

    return response.status(400).json({ message: 'Id not found!' })
  }

  repositories.splice(index, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {

    return response.status(400).json({ message: 'Id not found!' });
  }

  const { title, url, techs } = repositories[index];

  let { likes } = repositories[index];

  likes = likes + 1;

  const repository = {
    title,
    url,
    techs,
    id,
    likes,
  }

  repositories.splice(index, 1, repository);

  return response.json(repository);
});

module.exports = app;