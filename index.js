var express = require("express");
var bodyParser = require("body-parser");
var port = (process.env.PORT || 1607);
var app = express();


var API_BASE_PATH = "/api/v1/";
var year = [
    
        {
        "name":"Julio",
        "age":21
        },
        {
           "name":"Vicente",
        "age":24  
        },
        {
<<<<<<< HEAD
           "name":"Vicente",
        "age":24  
        },
        {
           "name":"Vicente",
        "age":24  
        },
    {
           "name":"Jose",
=======
               "name":"Vicente",
        "age":24  
        },
          {
               "name":"Vicente",
        "age":24  
        },
          {
               "name":"Vicente",
>>>>>>> 21b0a0b38bd5ad97f5253679881fec0aca1f303a
        "age":24  
        }
    
    
    ];

app.use(bodyParser.json());
app.use("/",express.static(__dirname+"/public"));


app.get(API_BASE_PATH+"year",(req,res)=>{
    res.send(year);
});

app.post(API_BASE_PATH+"year",(req,res)=>{
    var years =  req.body;
    year.push(years);
    res.sendStatus(201);
    
});

app.listen(port,()=>{
    console.log("server ready TRUE!");//Se ejecuta el servidor al aparecer el mensaje.
}).on("error",(e)=>{
    console.log("Server NOT READY: "+e);
});

console.log("server ready FALSE!");//Aqui todavia no se ha ejecutadao.