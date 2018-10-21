const path = require('path');
const passport = require('passport');
const session = require('express-session');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const db = require('./app/config/db.config.js');

// Passport
app.use(
  session({ secret: 'CoolCoder', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session());
/////////////////////
// Hook the passport JWT strategy.
var hookJWTStrategy = require('./app/Services/passportStrategy');
hookJWTStrategy(passport);
/////////////////////

  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false, alert: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});


require('./app/config/passport.js')(passport, db.user);
require('./app/route/customer.route.js')(app,passport);
 
//////////////////////////////////////////////////////
app.get('/', function(req, res) {
  res.send('Nice meeting you wizard, I\'m deema!');
});

// Create a Server
var server = app.listen(9000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})