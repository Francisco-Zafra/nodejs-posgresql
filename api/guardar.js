var fs = require('fs');
var mysql      = require('mysql');

const { db } = require('../config');
const config = require('../config');
// convert JSON object to string
const data = JSON.stringify("mapa");
// write JSON string to a file

// fs.writeFile('../public/mapa.json', data, err => {
//     if (err) {
//     console.error(err);
//     return; 
//     }
//     console.log("Json guardado");
// });

var connection = mysql.createConnection(db);
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });
  
  connection.end();
