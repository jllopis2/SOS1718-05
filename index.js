var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var port = (process.env.PORT || 1607);
var app = express();
var dbFileName = __dirname + "/best.db";

var API_BASE_PATH = "/api/v1/";
var initialBests = [
    
        {
        "country":"Spain",
        "year":2017,
        "selling-album":"Prometo - Pablo Alboran",
        "radio-play":"Shape Of You - Ed Sheeran",
        "selling-song":"Despacito - Luis Fonsi & Daddy Yankee",
        
            
        },
        {
           "country":"Spain",
        "year":2016  ,
        "selling-album":"Bailar el viento - Manuel Carrasco",
        "radio-play":"Cheap Thrills - Sia & Sean Paul",
        "selling-song":"Duele el corazón - Enrique Iglesias & Wisin",
        }
    
    
    ];
/////////////////////////////////////////////////BASE DE DATOS
var db = new DataStore({
    
    filename : dbFileName,
    autoload : true
});

app.get(API_BASE_PATH+"best/loadInitialData",(req,res)=>{
    console.log(Date() + " - new GET /best");
    db.find({},(err,bests)=>{
        if(err){
            console.log("Error accesing DB");
            res.sendStatus(500);
        }
        if(bests.length == 0){
            db.insert(initialBests);
        }
    
        res.sendStatus(201);
    });
    
});
////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use("/",express.static(__dirname+"/public"));

/////////////////////////////////////////////////////CONJUNTO DE RECURSOS.
app.get(API_BASE_PATH+"best",(req,res)=>{
    console.log(Date() + " - new GET /best");
    db.find({},(err,bests)=>{
        if(err){
            console.log("Error accesing DB");
            res.sendStatus(500);
        }
    res.send(bests);
        
    });
    
});

app.post(API_BASE_PATH+"best",(req,res)=>{
    console.log(Date() + " - new POST /best");
    var aux =  req.body;
    db.insert(aux);
    res.sendStatus(201);
    
});

app.put(API_BASE_PATH+"best",(req,res)=>{
    console.log(Date() + " - new PUT /best");
    res.sendStatus(405);
});

app.delete(API_BASE_PATH+"best",(req,res)=>{
    console.log(Date() + " - new DELETE /best");
    db.remove({},{multi: true});
    res.sendStatus(200);
});    
    
///////////////////////////////////////////////////////UN SOLO RECURSO.    
 
app.get(API_BASE_PATH+"best/:year",(req,res)=>{
    console.log(Date() + " - new GET /best");
    var anyo = req.params.year;
    
    db.find({"year":anyo},(err,bests)=>{
         if(err){
            console.log("Error accesing DB");
            res.sendStatus(500);
        }
    console.log(bests);
    res.send(bests);
    });
}); 

app.delete(API_BASE_PATH+"best/:year",(req,res)=>{
    console.log(Date() + " - new DELETE /best");
    var year = req.params.year;
    db.remove({"year":this.year});

    res.sendStatus(200);
});  
    
app.post(API_BASE_PATH+"best/:year",(req,res)=>{
    console.log(Date() + " - new POST /best");
    

    res.sendStatus(405);
});     


app.put(API_BASE_PATH+"best/:year",(req,res)=>{
    console.log(Date() + " - new PUT /best");
    var year = req.params.year;
    var best = req.body;
    
    if(year != best.year){
        res.sendStatus(409);
    }
    
   db.update({"year" :best.year},best,(err,numUpdate)=>{
       console.log("Updated"+ numUpdate);
   })
    res.sendStatus(200);
    
});






//////////////////////////////////////////////////////////////////////


app.listen(port,()=>{
    console.log("server ready TRUE!");//Se ejecuta el servidor al aparecer el mensaje.
}).on("error",(e)=>{
    console.log("Server NOT READY: "+e);
});

console.log("server ready FALSE!");//Aqui todavia no se ha ejecutadao.