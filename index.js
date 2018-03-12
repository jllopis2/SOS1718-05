var express = require("express");       //cargamos el modulo   
var bodyParser = require("body-parser");

var port = (process.env.PORT || 1607); // informacion sobre lo que se esta ejecutando
var BASE_API_PATH = "/api/v1";
var app = express(); // cargamos una aplicacion apartir del modulo queimplementa un server web.

app.use(bodyParser.json());
//servidor estatico con express----servir html y jpg en una linea
app.use("/",express.static(__dirname+"/public"));

var contacts = [
        {
            "name": "vicente",
            "phone": 12345
        },
        {
            "name": "julio",
            "phone": 6789
        }
    ];

/*
app.get("/time",(req,res)=>{
    console.log("new request to /time");
    res.send(new Date());
}); //añadir una ruta
*/

app.get(BASE_API_PATH+"/contacts",(req,res)=>{
    res.send(contacts);
}); //añadir una ruta
///////////////////////////////////////hacemos un post
app.post(BASE_API_PATH+"/contacts",(req,res)=>{
    var contact = req.body;
    contacts.push(contact);
    res.sendStatus(201);
});


app.listen(port, ()=>{
    console.log("server ready on port"+port+"!");
}).on("error",(e)=>{
     console.log("server NOT ready"+e);
});

console.log("server setting up...");