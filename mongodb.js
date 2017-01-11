var mongodb = require('mongodb');

var mongoip = 'mongodb://localhost:27017';

var toolKit = {
	getMongo: function (col, callback) {
		let client = mongodb.MongoClient;
		client.connect(mongoip, function(err, db) {
			if (db) {
				let get = db.collection(col);
				return callback(err, get);
			}
		});
	} //callback: (MongoError err, Collection get)
}

module.exports = toolKit;