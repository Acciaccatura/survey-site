var mongodb = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;
var id = process.env.IP || '0.0.0.0';
var dbport = 27017;

app.use(express.static(__dirname + '/src/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/create',function(req, res, next){
	var mongo = mongodb.MongoClient;
	var bod = req.body;
	console.log(bod);
	mongo.connect('mongodb://localhost:' + dbport, function(err, db){
		if (err) {
			console.log(err);
		} else {
			db.collection('survey').insert({
				options: bod.option,
				title: bod.title
			});
		}
	});
	res.send('gotcha');
});

app.get('/create', function(req, res, next) {
	res.sendFile(__dirname + '/src/create.html');
});

app.use('/get',function(req, res, next){
	var mongo = mongodb.MongoClient;
	mongo.connect('mongodb://localhost:' + dbport, function(err, db){
		if (err) {
			console.log(err);
		} else {
			db.collection('survey').find().toArray(function(err, info){
				res.send(info);
			});
		}
	});
});

app.listen(port, id, function(){
	console.log('dude connected');
});
/*
mongodb.connect(id + ':' + dbport, (err, db) => {
	
});
*/