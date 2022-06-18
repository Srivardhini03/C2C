const User = require('../models/users');

module.exports.home = function(req,res){
  return res.render('home')
}
module.exports.signin = function(req,res){
  // if(req.isAuthenticated()){
  //     return res.redirect('/users/profile');
  //     //return res.redirect('back');
  // }
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
//    if (req.body.password != req.body.confirm_password){
  //      return res.redirect('back');
    //}

   User.findOne({email: req.body.email}, function(err, user){

       if(err){console.log('error in finding user in signing up' , err); return}

       if (!user){
            User.create({email:req.body.email,name:req.body.name,password:req.body.password},
              function(err, user){
                if(err){console.log('error in creating user while signing up',err); return}
                console.log(user);
                return res.redirect('/users/signin');
              })
        }else {return res.redirect('back'); }
 });
}

module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        console.log(user);
        return res.render('loan', {
            title: 'User Profile',
            profile_user:user
        })
    });
}

module.exports.createSession = function(req,res){
    //req.flash('success','Logged in Successfully');
    return res.redirect('/users/profile/'+ req.user.id);}
