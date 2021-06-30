var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var quotesRouter = require('./routes/quotes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/quotes', quotesRouter);

app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));


app.get('/', function(req, res) {
  fs.readFile('index.html', function(err, data) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  });
  return
});

module.exports = app;
