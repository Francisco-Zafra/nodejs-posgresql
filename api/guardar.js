var fs = require('fs');
// convert JSON object to string
const data = JSON.stringify("mapa");
// write JSON string to a file

fs.writeFile('mapa.json', data, err => {
    if (err) {
    console.error(err);
    return; 
    }
    console.log("Json guardado");
});
