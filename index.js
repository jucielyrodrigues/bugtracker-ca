const express = require('express');
const bodyParser = require('body-parser');
const app = (module.exports = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
app.use(bodyParser.json());

const userController = require('./controllers/users.js')();
const project = require('controllers/users')();

app.get('/users', userController.getUserController);
app.get('/users/:email', userController.getByEmail);
app.post('/users', userController.postUserController);

app.get('/project', project.userController);
app.get('/project/:slug', project.userController);
app.get('/project', project.postUserController);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, hostname, () => {
  console.log(`listening at http://${hostname}:${port}`);
});
