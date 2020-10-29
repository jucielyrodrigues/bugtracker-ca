const express = require('express');
const bodyParser = require('body-parser');
const app = (module.exports = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
app.use(bodyParser.json());

const userController = require('./controllers/users.js')();
const usersModel = require('./models/users.js')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues.js')();
const comments = require('./controllers/comments')();

app.use(async (req, res, next) => {
  const FailedAuth = {
    error: 'Failed login',
    message: 'you can not login',
    code: '****',
  };
  const suppliedKey = req.headers['x-api-key'];
  const clientIp =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (!suppliedKey) {
    console.log('No key suplied');
    new Date().clientIp;
    FailedAuth.code = '01';
    return res.status(401).json(FailedAuth);
  }

  const user = await usersModel.getByKey(suppliedKey);
  if (!user) {
    FailedAuth.code = '02';
    return res.status(401).json(FailedAuth);
  }
  next();
});
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

app.get('/issues/:issueNumber/comments', comments.getALL);
app.get('/issues/:issueNumber/comments/:commentsId', comments.getComment);
app.post('/issues/:issueNumber/comments', comments.postComment);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, hostname, () => {
  console.log(`listening at http://${hostname}:${port}`);
});

app.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: 'route not found',
  });
});
