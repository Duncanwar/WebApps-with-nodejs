var express = require("express");
var chalk= require("chalk");
var app= express();
 // to get route
app.get("/" ,function(req, res){
  res.send('Hello My Library App ');
});


// how to listen

app.listen(3000,function(){
console.log(`Sever has started ${chalk.gray('3000')}`);
});
