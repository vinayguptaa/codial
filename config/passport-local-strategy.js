const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport 
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) { //done is callback reporting to passport
        //find a user and establish identity
        User.findOne({email: email}, function(err, user) {
            if(err) {
                console.log('error finding user --> passport');
                return done(err);
            }

            if(!user || user.password != password) {
                console.log('Invalid UserName / Password');
                return done(null, false); //null as no error here and false that not authenticated
            }

            return done(null, user); //this user goes to the serializer
        });
    }
));

//serialize user function
//serialize the user to decide that which key is to be kept in the cookies (Sending cookie to browser) (session cookie)
passport.serializeUser(function(user, done) {
    return done(null, user.id); //will encrypt the cookie automatically
});

//deserialize function
//deserialize user from the key in the cookies (on browser's request)
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err) {
            console.log('error finding user --> passport');
            return done(err);
        }

        return done(null, user);
    });
})

//check if user is authenticated
passport.checkAuthentication = function(req, res, next) {
    //if user is signed in then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()) {
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        //req.user contains cuurent signed in user from the session cookie and we are giving it tp res locals for views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;