var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongodb = require('./mongodb.js');

var port = process.env.PORT || 3000;
var id = process.env.IP || '0.0.0.0';

app.use(express.static(__dirname + '/src/'));
app.set('views', __dirname + '/src/');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/nigga', function(req, res) {
	mongodb.getMongo('survey', function(err, col){
	var find = col.find();
	find.count(function(err, count) {
		var random = Math.floor(Math.random()*count);
		col.find().limit(-1).skip(random).next(function(err, doc){
			console.log(req.query);
			res.render('index', { document: doc, msg: req.query.msg });
			});
		});
	});
});

app.post('/create',function(req, res, next){
	var mongo = mongodb.MongoClient;
	var bod = req.body;
	mongodb.getMongo('survey', function(err, col){
		col.insert({
			title: bod.title,
			options: bod.option
		}, function (err){
			if (err) {}
			else {
				res.redirect(301, '/nigga?msg=1');
			}
		})
	});
});

app.get('/create', function(req, res, next) {
	res.render('create');
});

app.use('/get',function(req, res, next){
	var mongo = mongodb.MongoClient;
	mongo.connect(mongoip, function(err, db){
		if (err) {
			console.log(err);
		} else {
			db.collection('survey').find().toArray(function(err, info){
				res.render('index.html', { wow: 'wtf is going on' }, function(err, html){
					res.send(html);
				});
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