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

router.get("/cancer-support", function(req, res) {
  // send us to the next get function instead.
  res.render("cancer");
});

router.get("/addiction-support", function(req, res) {
  // send us to the next get function instead.
  res.render("addiction");
});

router.get("/abuse-victims-support", function(req, res) {
  // send us to the next get function instead.
  res.render("domestic");
});

router.get("/mental-health-support", function(req, res) {
  // send us to the next get function instead.
  res.render("suicidal");
});

router.get("/profile", function(req, res) {
  // send us to the next get function instead.
  res.render("profile");
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
router.post("/overcome/create", function(req, res) {
  // edited db create to add in a user_name
  db.overcome.create({
    user_name: req.body.user_name
  })
    // pass the result of our call
  .then(function(dbovercome) {
      // log the result to our terminal/bash window
    console.log(dbovercome);
      // redirect
    res.redirect("/");
  });
});

// put route to devour a burger
//router.put("/overcome/update", function(req, res) {
  // update one of the burgers
  //db.overcome.update({
   // devoured: true
  //},
    //{
      //where: {
        //id: req.body.user_id
      //}
    //}
  //).then(function(dbovercome) {
    //res.redirect("/");
  //});
//});

module.exports = router;
