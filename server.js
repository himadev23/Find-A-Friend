var express = require('express');
var bodyParser = require('body-parser');

var path = require("path");
var app = express();
var PORT = 3000;
var friends = [];

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname, "./app/public/home.html"))
});

app.get('/survey',function(req,res){
	res.sendFile(path.join(__dirname,"./app/public/survey.html"));
});
app.get('/api/friends',function(req,res){
	
	 res.json(friends);
	

});


app.post('/api/friends',function(req,res){
	var newData = req.body
	friends.push(newData);
	console.log(newData);
	console.log(friends);

});

app.listen(PORT);