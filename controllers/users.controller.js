var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

//routes
router.post('/authenticate', authenticate);
router.post('/register', register);


module.exports = router;

function authenticate(req,res){
    userService.authenticate(req.body.username, req.body.password)
        .then(function(user){
            if(user){
                //authentication successful
                console.log("authentication successful");                
                res.send(user);
                res.end()
            }else{
                //authentication failed
                console.log("authentication failed");                
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function(err){            
            console.log("erreur :"+ err );            
            re.status(400).send(err);
        })
}

function register(req,res){  
    //console.log("Je suis dans le register server");    
    userService.create(req.body)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}