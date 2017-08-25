var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require("path");

// listen on port 3000
var port = process.env.PORT || 3000;

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
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
var routes = require("./controllers/overcome_controller.js");

var authRoute = require('./routes/auth.js')(app, passport);


// override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

app.use("./", routes);
app.use("/update", routes);
app.use("/create", routes);


//Sync Database
db.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine.')

}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});



app.listen(port, function(err) {
    if (!err)
        console.log("Site is live. The server is listening on the port " + port);
    else console.log(err)

});


console.log(module.exports);