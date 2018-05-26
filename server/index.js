const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.text());

app.post('/home', (req, res) => {
  console.log('body', req.body);
  res.send(req.body);
})

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})