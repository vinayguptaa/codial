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

            return done(null, true);
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


module.exports = passport;