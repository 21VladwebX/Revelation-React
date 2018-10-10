
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var data = [];

app.use(bodyParser());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  console.log(data);
  let jsn = JSON.stringify(data);
  res.json(jsn);
});

app.post('/', function (req, res) {
  let datas = req.body;

  data = {
    name: datas.firstName,
    surname: datas.secondName
  }
  res.send(200);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});

