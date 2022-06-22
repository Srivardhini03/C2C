const express = require('express');
const router = express.Router();
const Loan = require('../controllers/loan_controller');

router.get('/applyLoan',Loan.applyLoan);
router.get('/giveLoan',Loan.giveLoan);
router.get('/:id1/giveLoanSubmit',Loan.giveLoanSubmit)

router.post('/applyLoanSubmit',Loan.applyLoanSubmit);

module.exports = router;
