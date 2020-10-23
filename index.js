const express = require('express');
const app = (module.exports = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(port, hostname, () => {
  console.log(`listening at http://${hostname}:${port}`);
});
