"use strict";
var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors());

const bodyParser = require('body-parser');
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


const http = require('http');
var mongoClient = require("mongodb").MongoClient;
/*var assert=require("assert");*/

var url = "mongodb://localhost:27017/bioInfo";

mongoClient.connect(url,function(err,db){
    if (err)  console.log("failed to connect to database bioInfo");
    else console.log("connexion réussie");   
    
    
    app.post('/register', function (req, res) {
        db.collection('users').insertOne({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
         })        
    });

    app.post('/authenticate', function(req,res){        
         db.collection('users').find({"username":req.body.username,"password":req.body.password})
            .toArray(function(err, documents) {
            res.setHeader('Content-Type','application/json; charset=utf-8');
            res.setHeader('Access-Control-Allow-Origin','*');
            var json = JSON.stringify(documents);
            console.log("JSON = "); console.log(json);
            res.end(json);            
       });
       console.log("user récupéré");           
    });
})

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));