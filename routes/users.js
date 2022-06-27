const express = require('express');
const router = express.Router();
const User = require('../controllers/user_controller');
//const Loan = require('../controllers/loan_controller');
const passport = require('passport');

router.get('/signin',User.signin);
router.get('/signup',User.signup);
router.get('/profile/:id',User.profile);
router.get('/sign-out',User.destroySession);
router.get('/profile/:id/myDetails',User.myDetails);
router.get('/profile/:id/history',User.history);

router.post('/create',User.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}

), User.createSession);
router.post('/profile/:id/bankDetails',User.bankDetails);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/c2c',passport.authenticate('google',{failureRedirect:'/users/signin'}),User.createSession);

router.use('/profile/loan', require('./loan'));


module.exports = router;
