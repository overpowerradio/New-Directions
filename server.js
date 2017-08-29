var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require('express-handlebars');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require("cookie-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var path = require("path");


// The models
var db = require("./models");


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());

var routes = require("./controllers/overcome_controller.js");
app.use("/", routes);
var authRoute = require('./routes/auth.js')(app, passport);


app.use("/update", routes);
app.use("/create", routes);


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// For Passport
app.use(session({ secret: 'krn', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport/passport.js')(passport, db.User);

// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync({ }).then(function() {
    app.listen(port);
    console.log("You are listening to port: " + port);
});


console.log(module.exports);