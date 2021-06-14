class Save{
    constructor(){

    }

    guardar(){


        // convert JSON object to string
        const data = JSON.stringify(mapa);
        console.log(data);
        // write JSON string to a file
        document.write(data);
    }

    cargar(){

    }
}