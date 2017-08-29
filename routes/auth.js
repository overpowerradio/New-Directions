var authController = require('../controllers/authcontroller.js');
var db = require("../models/");

module.exports = function(app, passport) {

   
    app.get('/signup', authController.signup);



    app.get('/signin', authController.signin);


  app.post('/signup',
  passport.authenticate('local-signup'),  function(req, res) {
    console.log("This is req.user default protocol to get info from PASSPORT from within auth.js " + req.user.email);
    // res.redirect('form' + req.email);
   db.User.find({
        where: {
            email: req.user.email
        }
    }).then(function(user) {
        res.render('form', {user: user.firstname, id: user.id});
    });
});

    // app.get('/profile', isLoggedIn, authController.profile);

    // user is logged out when he clicks on the log out ling in the uppr right corner when he is logged in
    app.get('/logout', authController.logout);


    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }

}