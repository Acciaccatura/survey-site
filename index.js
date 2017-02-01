var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongodb = require('mongodb');

var mongo = mongodb.MongoClient;
var mongoip = 'mongodb://localhost:27017';
var port = process.env.PORT || 3000;
var id = process.env.IP || '0.0.0.0';
var data;

app.set('views', __dirname + '/src/');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/src/'));
//favicon

app.get('/create', function(req, res) {
	res.render('create');
});

app.post('/$', function(req, res, next) {
	if (req.body.option) {
		let col = data.collection('survey');
		let doc = { title: req.body.title };
		let options = req.body.option; 
		let opts = [];
		for (let a = req.body.option.length - 1; a >= 0; a--)
			opts[a] = { qid: a, option: options[a], score: 0 };
		doc.options = opts;
		doc.total = 0;
		console.log(doc);
		col.insert(doc, function(err){
			if (!err)
				req.msg = 2;
			else {
				req.msg = 1;
			}
			next();
		});
	} else next();
});

app.post('/$', function(req, res, next) {
	if (req.body.choice) {
		let parsed = parseInt(req.body.choice);
		console.log(parsed);
		if (!isNaN(parsed)) {
			let get = 'options.' + parsed + '.score';
			let col = data.collection('survey');
			console.log(req.body.id + ' ' + get);
			col.update({ '_id': new mongodb.ObjectID(req.body.id), 'options.qid': parsed },
				{ '$inc': { 'options.$.score': 1, 'total': 1 } },
				function(err, result) {
					if (!err) {
						req.msg = 3;
						prev = req.body.id;
					} else {
						console.log(err);
						req.msg = 1;
					}
					next();
				}
			);
		}
	} else next();
});

app.use('/$', function(req, res, next){
	let col = data.collection('survey');
	let q = new mongodb.ObjectID(req.body.id);
	let doc = col.find({ '_id': q }).next(function(err, doc){
		if (doc) {
			let retthis = { document: doc };
			let total = 0;
			for (let a = 0; a < retthis.document.options.length; a++) {
				retthis.document.options[a].size = Math.round(10000*(retthis.document.options[a].score/retthis.document.total))/100;
			}
			res.prevDoc = doc;
		}
		next();
	});
}, (req, res) => {
	let col = data.collection('survey');
	let find = col.find();
	find.count(function(err, count) {
		let random = Math.floor(Math.random()*count);
		console.log(count + ' ' + random);
		col.find().limit(-1).skip(random).next(function(err, doc){
			if (err) {
				res.send('error');
			} else {
				let returnthis = { document: doc, msg: req.msg };
				for (let a = 0; a < doc.options.length; a++) {
					console.log(doc.options[a]);
				}
				returnthis.prev = res.prevDoc;
				if (res.prevDoc)
					returnthis.prevExists = "none";
				else
					returnthis.prevExists = "default";
				console.log(returnthis);
				res.render('index', returnthis);
			}
		});
	});
});

mongo.connect(mongoip, function (err, db) {
	if (db) {
		data = db;
		app.listen(port, id, function(){
			console.log('Connected on ' + id + ":" + port);
		});
	}
});