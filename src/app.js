const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories)
});

app.post("/repositories", (req, res) => {
  const { body: { title, url, techs } } = req
  const repo = { id: uuid(), title, url, techs, likes: 0 }
  repositories.push(repo)
  return res.json(repo)
});

app.put("/repositories/:id", (req, res) => {
  const { params: { id }, body: { title, url, techs } } = req


  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found.' })
  }

  const repo = {
    id, title, url, techs, likes: repositories[repoIndex].likes
  }

  repoIndex[repoIndex] = repo

  return res.json(repo)
});

app.delete("/repositories/:id", (req, res) => {
  const { params: { id } } = req

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found.' })
  }

  repositories.splice(repoIndex, 1)

  return res.status(204).send()
});

app.post("/repositories/:id/like", (req, res) => {
  const { params: { id } } = req


  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found.' })
  }

  const repo = {
    ...repositories[repoIndex],
    likes: repositories[repoIndex].likes + 1
  }

  repositories[repoIndex] = repo

  return res.json(repo)
});

module.exports = app;
