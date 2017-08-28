var exports = module.exports = {}
var session = require('express-session');

exports.signup = function(req, res) {

    res.render('profile');

}

exports.signin = function(req, res) {

    res.render('signin');

}

exports.profile = function(req, res) {

    res.render('profile');

}

exports.logout = function(req, res) {
    res.redirect('home');
}