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
          status : "pending"
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
  //  console.log(loans);
  return res.render("giveLoan",{loans:loans});
  });
}

module.exports.giveLoanSubmit = function(req,res){
  const id1 = req.params.id1; //loan
  const id2 = req.params.id2;//loanee
  const id=req.user._id; //loner
  Loan.loan.findById(id1,function(err,loan){
//    console.log(loan);
    if(err){
      console.log(err);
    }
    else{
      loan.status = "approved";
      loan.lenderID = id;
      loan.dateOfApproval = new Date().toISOString().slice(0,10);
      loan.save();

      User.findById(id,function(err,user){
        if(err){
          console.log(err);
        }else{
          user.loanGiven.push(loan);
          user.save();
              }
       });
       User.findById(id2,function(err,user){
        // console.log(user);
         if(err){
           console.log(err);
         }else{
           for(let i=0;i<user.loanApplied.length;i++){
             if(user.loanApplied[i]._id.toString()==loan._id.toString()){

               user.loanApplied[i].status="approved";
               user.loanApplied[i].lenderID = id;
               user.loanApplied.dateOfApproval = new Date().toISOString().slice(0,10);
             }
           }
           user.save();
               }
        });
      console.log("loan given Successfully");
     }
      return res.redirect("back");
  });
}
