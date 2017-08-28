var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {

    app.get('/signup', authController.signup);


    app.get('/signin', authController.signin);


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/form',
        failureRedirect: '/signup'
    }));


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