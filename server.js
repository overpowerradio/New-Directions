var express = require("express");
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require('express-handlebars');
var path = require("path");

// The models
var db = require("./models");


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/overcome_controller.js");
var authRoute = require('./routes/auth.js')(app, passport);

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

// For Passport
app.use(session({ secret: 'team EMS', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport/passport.js')(passport, db.User);

// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync({ forced: true }).then(function() {
  app.listen(port);
  console.log("You are listening to port: " + port);
});


console.log(module.exports);
