// Pour utiliser les chemins absolus  au lieu des relatifs a
require('rootpath')(); 

var express = require('express');
var app = express();
var cors = require('cors');

/*express a besoin du module bodyParser pour exploiter 
les donnée qui proviennent du serveur */
var bodyParser = require('body-parser');

/*module pour permettre d'authentifier les requêtes
http à l'aide des jetons */
var expressJwt = require('express-jwt');

/*fichier de configuration*/
var config = require('config.json');
const http = require('http');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/users', require('./controllers/users.controller'));
app.use('/account', require('./controllers/account.controller'));


/*
app.use(expressJwt({
    secret: config.secret,
    getToken:function(req){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            return req.headers.authorization.split(' ')[1];
        }else if (req.query && req.query.token){
            return req.query.token;
        }
        return null;
    }   
}).unless({path:['/users/authenticate','/users/register']}));
*/

// routes


//Set Port and start server
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
