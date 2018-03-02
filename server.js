var express = require('express');
var bodyParser = require('body-parser');

var path = require("path");
var app = express();
var PORT = 3000;
var friends = [];

var friendArray = require('./app/data/friends.js');
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"))
});

app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});
app.get('/api/friends', function(req, res) {

    res.json(friendArray);


});


app.post('/api/friends', function(req, res) {
    
    var newData = req.body;

    friends.push(newData);
    


});

app.get('/model',function(req,res){
	var count = 0;
    
    for (var i = 0; i < friendArray.length; i++) {
        var finalDiffrence = 0;
        for (var j = 0; j < friends.length; j++) {
            var difference = friendArray[i].scores[j] - friends[0].scores[j];
			finalDiffrence = finalDiffrence + Math.abs(difference);
			}
        if (count < finalDiffrence) {
            count = finalDiffrence;
            console.log('count', count);
            console.log(friendArray[i]);
            res.json(friendArray[i]);
        }


    }
})

app.listen(PORT);