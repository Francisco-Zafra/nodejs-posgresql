class Save{
    constructor(){

    }

    guardar(){
        const fs = require('fs');
        // convert JSON object to string
        const data = JSON.stringify(mapa);
        console.log(data);
        fs.writeFile('save.json', data, err => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Json guardado");
          })          
    }

    cargar(){
      module.exports = (req, res) => {
        const { name = 'World' } = req.query
        res.send(`Hello ${name}!`)
    }
  }
}