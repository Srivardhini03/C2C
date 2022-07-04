const User = require('../models/users');

module.exports.home = function(req,res){
  return res.render('home')
}
module.exports.signin = function(req,res){
  if(req.isAuthenticated()){
      return res.redirect('/users/profile');
      //return res.redirect('back');
  }
  return res.render('login', {
      title: "Codeial | Sign In"
  })
}

module.exports.signup = function(req,res){
  if(req.isAuthenticated()){
      return res.redirect('/users/profile');
      //return res.redirect('back');
  }
  return res.render('register', {
      title: "Codeial | Sign Up"
  })
}

module.exports.create = function(req, res){
   if (req.body.password != req.body.confirm_password){
       return res.redirect('back');
    }

   User.findOne({email: req.body.email}, function(err, user){

       if(err){console.log('error in finding user in signing up' , err); return}

       if (!user){
            User.create({email:req.body.email,name:req.body.name,password:req.body.password},
              function(err, user){
                if(err){console.log('error in creating user while signing up',err); return}
              //  console.log(user);
                return res.redirect('/users/signin');
              })
        }else {return res.redirect('back'); }
 });
}

module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        //console.log(user);
        return res.render('home', {
            title: 'User Profile',
            profile_user:user
        })
    });
}

module.exports.createSession = function(req,res){
  //  req.flash('success','Logged in Successfully');
    return res.redirect('/users/profile/'+ req.user.id);}

module.exports.destroySession = function(req,res){
        req.logout();
       //req.flash('success','You are logged Out!!');
        return res.redirect('/');
      }

module.exports.myDetails = function(req,res){
  return res.render("myDetails");
}


module.exports.bankDetails =function(req,res){
  console.log(req.params.id);
        User.findById(req.params.id,function(err,user){
            if(err){
              console.log(err);
            }
            else{
              user.bankDetails.name=req.body.name;
              user.bankDetails.accNo=req.body.accNo;
              user.bankDetails.ifsc=req.body.ifsc;
              user.bankDetails.email=req.body.email;
              user.bankDetails.num=req.body.num;
              user.save();
            //  console.log(user.bankDetails);
           }
        });
        console.log("bank details saved")
        return res.redirect("back");

}

module.exports.history = function(req,res){

  function addMonths(numOfMonths, date = new Date()) {
  date.setMonth(date.getMonth() + numOfMonths);

  return date;
}

  User.findById(req.params.id,function(err,user){
    user.loanApplied.forEach(function(item){

      function addMonths(numOfMonths, date = new Date()) {
        const dateCopy = new Date(date.getTime());
        dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);
        return dateCopy;
      }

      const date = new Date(item.dateOfApproval);
      const result = addMonths(item.tenure, date);

     if(result == new Date().toISOString().slice(0,10)){
       item.status="completed";
       item.save();
     }
});
user.loanGiven.forEach(function(item){

  function addMonths(numOfMonths, date = new Date()) {
    const dateCopy = new Date(date.getTime());
    dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);
    return dateCopy;
  }

  const date = new Date(item.dateOfApproval);
  const result = addMonths(item.tenure, date);

 if(result == new Date().toISOString().slice(0,10)){
   item.status="completed";
   item.save();
 }
});
  return res.render("history",{loanGiven:user.loanGiven,loanApplied:user.loanApplied});
});
}
