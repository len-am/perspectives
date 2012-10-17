//bootstrap database
var db = Ti.Database.open('perspectives');
db.execute('CREATE TABLE IF NOT EXISTS perspectives(id INTEGER PRIMARY KEY, acsId TEXT, photoId TEXT, url TEXT, thumbsUp INTEGER, thumbsDown INTEGER, locLat REAL, locLong REAL);');

db.close();

exports.list = function() {
	var perspectives = [];
	var db = Ti.Database.open('perspectives');
	var result = db.execute('SELECT * FROM perspectives ORDER BY thumbsUp DESC, thumbsDown ASC');
	while (result.isValidRow()) {
		perspectives.push(exports.getPerspective(result));
		result.next();
	}
	result.close();
	//make sure to close the result set
	db.close();

	return perspectives;
};

exports.queryPerspective = function(_id) {
	var db = Ti.Database.open('perspectives');
	var result = db.execute('SELECT * FROM perspectives WHERE id = ?', _id);
	var perspective = exports.getPerspective(result);
	db.close();
	return perspective;
};

exports.getPerspective = function(result) {
	return {
		//add these attributes for the benefit of a table view
		id : result.fieldByName('id'), //custom data attribute to pass to detail page
		acsId : result.fieldByName('acsId'),
		photoId : result.fieldByName('photoId'),
		hasChild : false,
		leftImage : "images/hanauma_small.png",
		//add actual db fields
		url : result.fieldByName('url'),
		thumbsUp : result.fieldByName('thumbsUp'),
		thumbsDown : result.fieldByName('thumbsDown'),
		locLat : Number(result.fieldByName('locLat')),
		locLong : Number(result.fieldByName('locLong'))
	};
};

// we need to call this w/in this file, so set to a local variable
var addLocation = function(_acsId, _photoId, _url, _thumbsUp, _thumbsDown, _locLat, _locLong, _notify) {
	var db = Ti.Database.open('perspectives');

	if ( typeof (_thumbsUp) == 'undefined') {
		_thumbsUp = 0;
	}

	if ( typeof (_thumbsDown) == 'undefined') {
		_thumbsDown = 0;
	}

	if ( typeof (_photoId) == 'undefined') {
		_photoId = "";
	}

	if ( typeof (_acsId) == 'undefined') {
		_acsId = "";
	}

	if ( typeof (_url) == 'undefined' || _url == null) {
		_url = "";
	}

	var updated = false;
	var payload = {};
	if (_acsId != "") {
		var result = db.execute('SELECT * FROM perspectives WHERE acsId = ? ', _acsId);
		if (result.isValidRow()) {
			db.execute("UPDATE perspectives SET thumbsUp = ?, thumbsDown = ?, url = ?, locLat = ?, locLong = ?,  WHERE id = ?", _thumbsUp, _thumbsDown, _url, _locLat, _locLong, _acsId);
			payload = {
				'acsId' : acsId
			};
			updated = true;
		}
	}

	if (!updated) {
		db.execute("INSERT INTO perspectives(acsId, photoId, url, thumbsUp, thumbsDown, locLat, locLong) VALUES(?,?,?,?,?,?,?)", _acsId, _photoId, _url, _thumbsUp, _thumbsDown, _locLat, _locLong);
	}
	db.close();

	if (_notify) {
		Ti.App.fireEvent("databaseUpdated", payload);
	}
};

var update = function(_perspective, _notify) {
	var db = Ti.Database.open('perspectives');
	db.execute("UPDATE perspectives SET thumbsUp = ?, thumbsDown = ?, url = ? WHERE id = ?", _perspective.thumbsUp, _perspective.thumbsDown, _perspective.url, _perspective.id);
	db.close();
	if (_notify) {
		Ti.App.fireEvent("databaseUpdated");
	}
};

var deleteRemote = function() {
	var db = Ti.Database.open('perspectives');
	db.execute("DELETE FROM perspectives WHERE photoId IS NOT ?", "");
	db.close();
};

// then add to the exports list
exports.addLocation = addLocation;
exports.update = update;
exports.deleteRemote = deleteRemote;

//determine if the database needs to be seeded
if (!Ti.App.Properties.hasProperty('seeded')) {
	addLocation("", "", "images/photo-1.jpg", 50, 5, 21.43891, -158.00006, false);
	addLocation("", "", "images/photo-2.jpg", 1, 20, 21.70571, -157.99737, false);
	addLocation("", "", "images/photo-3.jpg", 15, 3, 21.69707, -158.00752, false);
	addLocation("", "", "images/photo-4.jpg", 100, 20, 52.37644, 4.88432, false);
	addLocation("", "", "images/photo-5.jpg", 4, 1, 35.54153, -82.55250, false);
	addLocation("", "", "images/photo-6.jpg", 34, 5, 38.88145, -77.03655, false);
	addLocation("", "", "images/photo2.jpg", 2, 59, 37.30096, -122.04468, false);
	addLocation("", "", "images/photo3.jpg", 39, 34, 37.02387, -122.21412, false);
	addLocation("", "", "images/photo4.jpg", 34, 56, 37.38605, -122.08385, false);
	addLocation("", "", "images/photo5.jpg", 134, 5, 45.52345, -122.67621, false);
	Ti.App.Properties.setString('seeded', 'yuppers');
}