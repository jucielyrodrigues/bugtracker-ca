const express = require('express');
const bodyParser = require('body-parser');
const app = (module.exports = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
app.use(bodyParser.json());

const userController = require('./controllers/users.js')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues.js')();

app.get('/users', userController.getUserController);
app.get('/users/:email', userController.getByEmail);
app.post('/users', userController.postUserController);

app.get('/projects', projects.getController);
app.get('/projects/:slug', projects.getBySlug);
app.post('/projects', projects.postController);

app.get('/issues', issues.getController);
app.get('/issues/:slug', issues.getByIssue);
app.get('/projects/:slug/issues', issues.getByProject);
app.post('/projects/:slug/issues', issues.postController);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, hostname, () => {
  console.log(`listening at http://${hostname}:${port}`);
});
