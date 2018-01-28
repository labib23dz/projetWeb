var config = require('config.json');
var Q = require('q');
//var mongo = require('mongoskin');
//var db = mongo.db(config.connectionString,{native_parser:true});

var mongoClient=require('mongodb').MongoClient;
var mongoDbObj;
mongoClient.connect(config.connectionString, function(err, db) {
    if (err)
      console.log(err);
    else {
      //console.log("Connected to MongoDB");
      mongoDbObj = {
        db: db,
        séquences: db.collection('séquences')
      };
    }
  });

//var promise = require('es6-promise').Promise;
//db.bind('séquences');

var service = {};

service.uploadSeq = uploadSeq;
service.GetSeq = GetSeq; 
service.getFiles =getFiles;
service.getseqFiles= getseqFiles;
module.exports = service;


function uploadSeq(reqParam){  

    //console.log("Je suis dans le service uploadSeq serveur");
    
    var deferred = Q.defer();    
    var id; 
    var sequ;
    var tmp;
    var nom = reqParam.nom;;
    let seqs = reqParam.sequence.split(">");
    //console.log(seqs);
    let head=seqs[0];
    for (var i =1; i < seqs.length; i++) 
    {   
        //console.log(typeof seqs[i]);
        tmp=seqs[i].split("\n");
        id=tmp[0];
        tmp.shift();
        sequ=tmp.join('\n');
        mongoDbObj.séquences.insertOne({
            username : reqParam.username,
            nom: nom,
            header: head,
            sequence_id: id,
            sequence: sequ
        },function (err, doc) {
            if (err!=null) deferred.reject(err.name + ': ' + err.message);            
        });
    }    
    deferred.resolve();        
    return deferred.promise;
}

function getFiles(username){
    var deferred = Q.defer();
    let filtre={};
    filtre.username=username;

    mongoDbObj.séquences.distinct("nom",filtre,function(err,documents){
        if(documents){
            var docs = JSON.stringify(documents);                   
            console.log(docs);     
            deferred.resolve(documents);            
        }else{
            deferred.reject(err.name + ': '+err.message);
        }

    });

    return deferred.promise;
}
function getseqFiles(filename, username){
    console.log(filename+" "+username);
    var deferred = Q.defer();
    let filtre={};
    filtre.nom=filename;
    filtre.username=username;
    mongoDbObj.séquences.find(filtre).toArray(function(err,documents){
        if(documents){            
            var docs = JSON.stringify(documents);                   
                 
            deferred.resolve(documents);            
        }else{
            deferred.reject(err.name + ': '+err.message);
        }
    });

    return deferred.promise;
}
function GetSeq(critere, val_critere, username){    
    var deferred = Q.defer();
    
    //let critere= critere;
    //let valeur= val_critere;
    console.log(critere+" "+val_critere);
    let filtre= {};
    let filtre2={};

    switch(critere) 
    {
        case 'gene' :
            
            filtre.sequence_id =new RegExp(val_critere,'gi');
            
            filtre2.header=new RegExp(val_critere,'gi');
            break;
            
        case 'sequence':
            filtre.sequence=new RegExp(val_critere,'gi');
            break;
        
    }    
    filtre.username=username;
    console.log(filtre);
    mongoDbObj.séquences.find(filtre).toArray(function(err,documents){
        if(documents){
            console.log("Je vais imprimer le documents ");            
            var docs = JSON.stringify(documents);                   
            console.log(docs);     
            deferred.resolve(documents);            
        }else{
            deferred.reject(err.name + ': '+err.message);
        }
    });

    return deferred.promise;
}
