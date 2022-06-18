const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

console.log('router loaded');


router.get('/', UserController.home);
router.use('/users',require('./users'));
//router.use('/loan', require('./loan'));

module.exports = router;
