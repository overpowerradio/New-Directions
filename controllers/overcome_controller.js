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

router.get("/home", function(req, res) {
    // send us to the next get function instead.
    res.render("home");
});

router.get("/profile", function(req, res) {
    // send us to the next get function instead.
    res.render("profile");
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

router.get("/form", function(req, res) {
   console.log("this what THIS is in the overcome_controller.js " + this);
   
      db.User.find({
        where: {
            id: 7
        }
    }).then(function(user) {
        res.render('form', {user: user.firstname});
    });
});

router.get("/profile/:id", function(req, res) {
    db.User.find({
        where: {id: req.params.id}
    
}).then(function(user){


    res.render('profile', 
        {firstname: user.firstname},
        {picture: user.picture},
        {location: user.location},
        {facebook: user.facebook},
        {instagram: user.instagram},
        {linkedIn: user.linkedIn});

        // {story: story.story},
        // {solution: story.solution}
})
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

router.get("/:id", function(req, res) {
    
    db.User.find({
        where: {
            id: req.params.id
        }
    
}).then(function(user){
    res.render('profile', {
            user: user.firstname,
            firstname: user.firstname, 
            lastname: user.lastname,
            picture: user.avatarImg,
            location: user.location,
            facebook: user.facebook,
            instagram: user.instagram,
            linkedIn: user.linkedIn});
       })
});


router.put("/:id", function(req, res) {
   
   var newUser = {
    avatarImg: req.body.avatarImg,
    location: req.body.location,
   };
   var userId = "";
   userId = req.params.id;

   db.User.update(newUser, {
        where: {
            id: userId
        } 
    }).then(function(newUser) {
        console.log("this var userId ====== " + userId);
        console.log("this var newUser ====== " + newUser);
        db.User.find({
        where: {
            id: userId
        }
    }).then(function(newUser){


    res.render('profile', {
            user: newUser.firstname,
            firstname: newUser.firstname, 
            lastname: newUser.lastname,
            picture: newUser.avatarImg,
            location: newUser.location,
            facebook: newUser.facebook,
            instagram: newUser.instagram,
            linkedIn: newUser.linkedIn});
       }) 
        });
});
module.exports = router;