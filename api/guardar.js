
var fs = require('fs');
// convert JSON object to string
var data = JSON.stringify("mapa");
console.log(data);
fs.writeFile('save.json', data, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Json guardado");
  })  