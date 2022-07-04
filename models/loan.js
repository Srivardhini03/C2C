const mongoose = require('mongoose');
const loanSchema = new mongoose.Schema ({
  loanee: String,
  loaneeID : String,
  accNo : String,
  amount : String,
  tenure : Number,
  interest : String,
  lenderID : String,
  status : String,
  dateOfApproval : String
});

const Loan = mongoose.model('Loan',loanSchema);
module.exports = loanSchema;
module.exports.loan = Loan;
