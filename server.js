var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require("path");

// bring in the models
var db = require("./models");

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'team EMS', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport/passport.js')(passport, db.User);

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

//For Handlebars
app.set('views', './views')
app.engine('handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');

//Routes
var routes = require("./controllers/overcome_controller.js");
app.use("./", routes);
app.use("/update", routes);
app.use("/create", routes);

var authRoute = require('./routes/auth.js')(app, passport);

var port = process.env.PORT || 3000;
db.sequelize.sync({force: true}).then(function() {
  app.listen(port);
});

console.log(module.exports);