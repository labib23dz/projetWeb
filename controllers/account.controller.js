var config = require('config.json');
var express = require('express');
var router = express.Router();
var accountService = require('services/account.service');

//routes
router.post('/uploadSeq', uploadSeq);
router.get('/GetSeq/:critere/:val_critere/:username',GetSeq);
router.get('/files/:username',GetFiles);
router.get('/getseqFile/:filename/:username',GetseqFiles);


module.exports = router;

function GetseqFiles(req,res){
   
    accountService.getseqFiles(req.params.filename,req.params.username).then(function(documents){

        if(documents){
            
        res.setHeader('Content-Type','application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin','*');                   
        res.send(documents);
        res.end()
        }
     else{
         res.status(400).send('erreur');
    }
})
.catch(function(err){
 res.status(400).send(err); 
})
}
function uploadSeq(req,res){    
    accountService.uploadSeq(req.body)
    .then(function(){
        //console.log("je suis dans le then uploadSeq");
        res.sendStatus(200);
    })
    .catch(function(err){
        //console.log("je suis dans l'erreur du controleur");
        res.status(400).send(err);
    })
}
function GetFiles(req,res){
    console.log("fichiers de "+req.params.username);
    accountService.getFiles(req.params.username).then(function(documents){
        if(documents){
                   
            res.setHeader('Content-Type','application/json; charset=utf-8');
            res.setHeader('Access-Control-Allow-Origin','*');                   
            res.send(documents);
            res.end()
        }
        else{
            res.status(400).send('Aucune séquence enregistrées par utilisateur');
        }
    })
    .catch(function(err){
        res.status(400).send(err); 
    })
}
function GetSeq(req, res){
    console.log("critere = "+ req.params.critere);
    console.log("val_critere = "+ req.params.val_critere);
    accountService.GetSeq(req.params.critere, req.params.val_critere,req.params.username)
    .then(function(documents){
        if(documents){
            var docs = JSON.stringify(documents);            
            res.setHeader('Content-Type','application/json; charset=utf-8');
            res.setHeader('Access-Control-Allow-Origin','*');                        
            res.send(docs);
            res.end()
        }else{            
            res.status(400).send('Aucune séquence enregistrées');
        }

        
    })
    .catch(function(err){
        res.status(400).send(err); 
    }) 
}


