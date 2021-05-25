const express = require('express');
const router = express.Router();
const usersController= require('../controllers/users_controller');
const passport = require('passport');

router.get('/', usersController.users);
router.get('/profile', passport.checkAuthentication ,usersController.profile);
router.get('/posts', usersController.posts);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);

//use passport as a middleware to autenticate
router.post('/create-session', passport.authenticate(
    'local', //strategy used
    { failureRedirect: '/users/sign-in' }
) , usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;