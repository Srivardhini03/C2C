const Loan = require('../models/loan');
const User = require('../models/users');

module.exports.applyLoan = function(req,res){
  return res.render("applyLoan");
}

module.exports.applyLoanSubmit = function(req,res){
  const id=req.user._id
  User.findById(id,function(err,user){

      if(err){
        console.log(err);
      }
      //console.log(user);
      else{
        var new_loan = new Loan.loan({
          loanee: user.name,
          loaneeID : id,
          accNo : user.bankDetails.accNo,
          amount : req.body.amount,
          tenure : req.body.tenure,
          interest : req.body.interest,
          status : "pending",
          dateOfApproval : new Date().toLocaleDateString()
        });
        new_loan.save();
        user.loanApplied.push(new_loan);
        user.save();
           console.log("applied loan Successfully");
    //   console.log(user.bankDetails);
    }
     return res.redirect("back");

  });
}

module.exports.giveLoan = function(req,res){

  Loan.loan.find({}, function(err, loans){
    console.log(loans);
  return res.render("giveLoan",{loans:loans});
  });
}

module.exports.giveLoanSubmit = function(req,res){
  return res.render("applyLoan");
}
