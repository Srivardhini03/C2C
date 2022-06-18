const express = require('express');
const router = express.Router();
const User = require('../controllers/user_controller');
const Loan = require('../controllers/loan_controller');
const passport = require('passport');

router.get('/signin',User.signin);
router.get('/signup',User.signup);
router.get('/profile/:id',User.profile);

router.post('/create',User.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}

), User.createSession);

router.get('/profile/:id/applyLoan',Loan.applyLoan);

module.exports = router;
