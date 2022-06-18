
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Proj", {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting MongoDB"));

db.once('open',function(){
console.log("Server is succesfully connected to :: MongoDB");
})

module.exports = db;
