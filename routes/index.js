var express = require('express');
var router = express.Router();
const http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
const { nextTick } = require('process');

app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'alive'});
});

app.post('/guardar', function(req, res) {
  // var mapa = JSON.parse(req.body.value);
  var mapa = req.body
  fs.writeFile("mapa.json", JSON.stringify(mapa), function (err) {
    if (err) return console.log(err);
  });
  res.send("OK");
});

app.post('/guardar2', function(req, res) {
  // var mapa = JSON.parse(req.body.value);
  var path = req.body
  fs.writeFile("path.json", JSON.stringify(path), function (err) {
    if (err) return console.log(err);
  });
  res.send("OK");
});

app.get('/cargar', function(req, res) {
  // var mapa = JSON.parse(req.body.value);
  fs.readFile('mapa.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.send(data);
  })
  //res.end();
  return
});

app.get('/cargar2', function(req, res) {
  // var mapa = JSON.parse(req.body.value);
  fs.readFile('path.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.send(data);
  })
  //res.end();
  return
});

module.exports = router;
