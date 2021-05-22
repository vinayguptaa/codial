const User = require('../models/user');

module.exports.users = function(req, res) {
    return res.render('users', {
        title: "Users"
    });
}

module.exports.profile = function(req, res) {
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err, user) {
            if(err) { console.log('error in finding user while loading profile'); return;}

            if(user) {
                return res.render('user_profile', {
                    title: 'Codial | User Profile',
                    user: user
                });
            }

            //may be someone fiddled with the cookie
            return res.redirect('/users/sign-in');
        });
    } else {
        console.log('Please sign in firstly');
        return res.redirect('/users/sign-in');
    }
}

module.exports.posts = function(req, res) {
    return res.send("<h1>User's Posts here</h1>");
}

//sign up page render
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: 'Codial | Sign up'
    });
}

//sign in page render
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: 'Codial | Sign in'
    });
}

//get sign up data
module.exports.create = function(req, res) {
    if(req.body.password != req.body.confirm_password) {
        console.log("passwords does not match");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) { console.log('error in finding user in signing up'); return;}

        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) { console.log('error in creating user while signing up'); return;}

                console.log('*****User created******', user);
                return res.redirect('/users/sign-in');
            });
        }else {
            console.log('User already exists');
            return res.redirect('back');
        }
    })
}

//sign in user and creating a session for him/her
module.exports.createSession = function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {console.log('error in finding user while signing in'); return;}

        if(user) {
            if(user.password != req.body.password) {
                console.log('Incorrect password!!');
                return res.redirect('back');
            }

            res.cookie('user_id', user._id);
            return res.redirect(`/users/profile`);
        }else {
            console.log('user does not exist, try re-entering email');
            return res.redirect('back');
        }
    });
}

//signing out
module.exports.signOut = function(req, res) {
    res.cookie('user_id', '');
    return res.redirect('/users/sign-in');
}