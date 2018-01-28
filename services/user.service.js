var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
//var mongo = require('mongoskin');
//var db = mongo.db(config.connectionString,{native_parser:true});

var mongoClient=require('mongodb').MongoClient;
var mongoDbObj;
mongoClient.connect(config.connectionString, function(err, db) {
    if (err)
      console.log(err);
    else {
      console.log("Connected to MongoDB");
      mongoDbObj = {
        db: db,
        users: db.collection('users')
      };
    }
  });


//var promise = require('es6-promise').Promise;
//db.bind('users');

var service = {};

service.authenticate = authenticate;
service.create = create;

module.exports = service;

function authenticate(username, password){
    //console.log("je suis dans authenticate du serveur ");

    var deferred = Q.defer();        
    mongoDbObj.users.findOne({username: username},function(err,user){
        if(user){
            if (bcrypt.compareSync(password, user.hash)){
                //console.log(user);            
                //authentication successful            
                deferred.resolve({
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: jwt.sign({sub: user.id}, config.secret)
                });
            }else{
                //authentication failed
                deferred.resolve();
            }
        }else{
            deferred.reject(err.name + ': '+err.message);
        }                                    
    });
    return deferred.promise;
}


function create(userParam){        
    var deferred = Q.defer();

    
    //validation
    mongoDbObj.users.findOne(
        {username:userParam.username}, function(err,user){
            if(err!=null) deferred.reject(err.name+': '+err.message);
            if(user){
                console.log("Utilisateur existe déjà");
                //username already exists
                deferred.reject('Username"'+userParam.username+'" is already taken');                
            }else{
                createUser();
            }
        });

    function createUser(){
        // set user object to userParam without the cleartext password        
        var user = _.omit(userParam, 'password');
        
        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
        
        mongoDbObj.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    } 
    return deferred.promise;   
}


