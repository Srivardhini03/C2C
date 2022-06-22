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

router.post('/create',User.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}

), User.createSession);
router.post('/profile/:id/bankDetails',User.bankDetails);

router.use('/profile/loan', require('./loan'));


module.exports = router;
