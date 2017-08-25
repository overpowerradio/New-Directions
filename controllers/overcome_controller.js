// overcome controller

var express = require("express");

var router = express.Router();
// edits model to match sequelize
var db = require("../models/");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.render("home");
});

router.get("/cancer", function(req, res) {
  // send us to the next get function instead.
  res.render("cancer");
});

router.get("/addiction", function(req, res) {
  // send us to the next get function instead.
  res.render("addiction");
});

router.get("/domestic", function(req, res) {
  // send us to the next get function instead.
  res.render("domestic");
});

router.get("/mentalhealth", function(req, res) {
  // send us to the next get function instead.
  res.render("suicidal");
});

router.get("/profile", function(req, res) {
  // send us to the next get function instead.
  res.render("profile");
});
router.get("/form", function(req, res) {
  // send us to the next get function instead.
  res.render("form");
});




// get route, edited to match sequelize
router.get("/overcome", function(req, res) {
  // replaced old function with sequelize function
  db.overcome.findAll()
    // used promise method to pass the burgers...
    .then(function(dbovercome) {
      console.log(dbovercome);
      // into the main index, updating the page
      var hbsObject = { user_name: dbovercome };
      return res.render("index", hbsObject);
    });
});

// post route to create db
router.post("/profile/create", function(req, res) {
  // edited db create to add in a user_name
  db.User.create({
    name: req.body.name,
    picture: req.body.picture,
    location: req.body.location,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    linkedIn: req.body.linkedIn
  })
    // pass the result of our call
  .then(function(dbovercome) {
      // log the result to our terminal/bash window
    console.log(dbovercome);
      // redirect
    res.redirect("/profile");
  });
});

module.exports = router;
