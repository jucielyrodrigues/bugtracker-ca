const express = require('express');
const bodyParser = require('body-parser');
const app = (module.exports = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
app.use(bodyParser.json());

const userController = require('./controllers/users.js')();
const projects = require('./controllers/projects')();

app.get('/users', userController.getUserController);
app.get('/users/:email', userController.getByEmail);
app.post('/users', userController.postUserController);

app.get('/projects', projects.getUserController);
app.get('/projects/:slug', projects.getUserController);
app.get('/projects', projects.postUserController);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, hostname, () => {
  console.log(`listening at http://${hostname}:${port}`);
});
