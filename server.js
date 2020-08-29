var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://HAnWNJS3Mj7U5oem:pedhu@cluster0.flgd8.mongodb.net/authDB?retryWrites=true&w=majority', {});
mongoose.connection.on('open', function(){
    console.log("MongoDB Connected ");
})
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname+'/frontend'));
app.get('/', function(req, res){
  res.sendFile(__dirname+'/frontend/index.html');
});
app.get('/login', function(req, res){
    res.sendFile(__dirname+'/frontend/login.html'); 
  });
  app.get('/register', function(req, res){
    res.sendFile(__dirname+'/frontend/register.html');
  });
  app.get('/succes', function(req, res){
    res.sendFile(__dirname+'/frontend/succes.html');
  });
  app.get('/error', function(req, res){
    res.sendFile(__dirname+'/frontend/error.html');
  });
  var userschema=mongoose.Schema(
    {
      username:String,
      email:String,
      password:String
    }
  );
  var usermodel=mongoose.model("auth", userschema);
  app.post("/api/register", (req,res)=>{
    var user=usermodel(req.body);
    user.save();
    res.redirect("/login");
  })
  app.post("/api/login", (req,res)=>{
    usermodel.find(req.body,(err,userdetails)=>{
      if(userdetails.length>0)
      res.redirect("/succes");
      else res.redirect("/error");
    })
    //res.redirect("/");
  })
var port= process.env.PORT  || 4000;
app.listen(port, function(){
    console.log("Site Running on http://localhost:"+port);
}); 