//Ahora vamos a referenciar a express, para poder hacer peticiones
const express = require("express");
const app = express();

//ahora vamos a importar mySQL
const mysql = require("mysql");

//Para evitar el error CORS en el navegador
const cors = require("cors");

app.use(cors());
app.use(express.json());

//Ahora vamos a crear una conexion de la base de datos
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Poseidon_.123",
    database:"empleados_crud"
});

//Ahora vamos a crear la peticion de guardar, va a tener la solicitud y respuesta que podemos obtener
app.post("/create", (req,res)=> {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    //Luego de que ya tengamos los datos que nos envien desde el formulario, vamos a decirle a nuestra base de datos que queremos hacer una consulta
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err,result) => { //Aqui podemos decirle que con esta variable capture los errores y me capture el resultado del proceso
        //con un if le preguntamos si hubo un error, y si si hubo que lo imprima
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }

    } 
    ); //Con los signos se promete que esos valores se enviaran mas adelante, enfrente podemos colcoar una lista con los valores, con esta lista se remplazaran los valores del signo del interrgoacion con los valores introducidos en los campos

});

////Ahora vamos a crear un metodo para listar datos
app.get("/empleados", (req,res)=> {

    //vamos a cambiar la instruccion
    db.query('SELECT * FROM empleados',
    (err,result) => { //Aqui podemos decirle que con esta variable capture los errores y me capture el resultado del proceso
        //con un if le preguntamos si hubo un error, y si si hubo que lo imprima
        if (err) {
            console.log(err);
        } else { //y sino que imprima el resultado
            res.send(result);
        }

    } 
    ); //Con los signos se promete que esos valores se enviaran mas adelante, enfrente podemos colcoar una lista con los valores, con esta lista se remplazaran los valores del signo del interrgoacion con los valores introducidos en los campos

});


///////Ahora sigue Actualizar los datos
app.put("/update", (req,res)=> {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    //En la instruccion estamos enviando todos los valores para que se haga la modificacion
    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
    (err,result) => { 
        //con un if le preguntamos si hubo un error, y si si hubo que lo imprima
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }

    } 
    ); //Con los signos se promete que esos valores se enviaran mas adelante, enfrente podemos colcoar una lista con los valores, con esta lista se remplazaran los valores del signo del interrgoacion con los valores introducidos en los campos

});


//Lo siguientes es para la eliminacion de datos
app.delete("/delete/:id", (req,res)=> {
    //Aqui solamente vamos a recibir el id
    const id = req.params.id; //Ya no va a ir en el cuerpo "body", sino como parametro
    

    //Con el id se va a realizar la elminacion
    db.query('DELETE FROM empleados WHERE id=?', id,
    (err,result) => { 
        //con un if le preguntamos si hubo un error, y si si hubo que lo imprima
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }

    } 
    );

});


//Ahora le decimos a la app que vamos a escucha por un puerto
app.listen(5174, () => {
    console.log("Corriendo en el puerto 5174");
})