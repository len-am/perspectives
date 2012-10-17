/*
Library to wrap app-specific functionality around the ACS APIs
*/
// a couple local variables to save state
var currentUser = null;
var loggedIn = false;

var db = require('lib/db');
var Cloud = require('ti.cloud');
Cloud.debug = true;

exports.isLoggedIn = function() {
	return loggedIn;
};

exports.login = function(callback) {
	Cloud.Users.login({
		login : 'newperspectives',
		password : 'app123'
	}, function(e) {
		if (e.success) {
			currentUser = e.users[0];
			loggedIn = true;
			callback(loggedIn);
		} else {
			Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			loggedIn = false;
			currentUser = null;
			callback(loggedIn);
		}
	});
};

exports.logout = function() {
	Cloud.Users.logout(function(e) {
		if (e.success) {
			currentUser = null;
			loggedIn = false;
		}
	});
};

exports.createUser = function(username, password, callback) {
	// ACS API requires password & confirm, but we do the checking elsewhere so use the same for both here
	Cloud.Users.create({
		username : username,
		password : password,
		password_confirmation : password
	}, function(e) {
		if (e.success) {
			Ti.API.info('user = ' + JSON.stringify(e.users[0]))
			currentUser = e.users[0];
			loggedIn = true;
			callback(currentUser);
		} else {
			Ti.API.info('Error' + JSON.stringify(e));
			loggedIn = false;
			currentUser = null;
			callback(false);
		}
	});
};

exports.update = function(perspective) {
	Cloud.Objects.update({
		classname : 'perspectives',
		id : perspective.acsId,
		fields : {
			photoId : perspective.photoId,
			url : perspective.url,
			thumbsUp : perspective.thumbsUp,
			thumbsDown : perspective.thumbsDown,
			locLat : perspective.locLat,
			locLong : perspective.locLong
		}
	}, function(e2) {
		if (e2.success) {
			db.update(perspective, true);
		} else {
			alert('Error:\\n' + ((e2.error && e.message) || JSON.stringify(e2)));
		}
	});
};

exports.uploadPhoto = function(photo, locLat, locLong) {
	Cloud.Photos.create({
		photo : photo,
		'photo_sync_sizes[]' : 'medium_640'
	}, function(e) {
		if (e.success) {
			// null out our photo objects to clean up memory
			photo = null;
			collectionID = null;

			// Add an entry to the
			var savedPhotoId = e.photos[0].id;

			Cloud.Photos.show({
				photo_id : savedPhotoId
			}, function(e1) {
				if (e1.success) {
					var uploadedPhoto = e1.photos[0];

					Cloud.Objects.create({
						classname : 'perspectives',
						fields : {
							photoId : savedPhotoId,
							url : uploadedPhoto.urls.medium_640,
							thumbsUp : 0,
							thumbsDown : 0,
							locLat : locLat,
							locLong : locLong
						}
					}, function(e2) {
						if (e2.success) {
							db.addLocation(e2.perspectives[0].id, savedPhotoId, uploadedPhoto.urls.medium_640, 0, 0, locLat, locLong, true);
						} else {
							alert('Error:\\n' + ((e2.error && e.message) || JSON.stringify(e2)));
						}
					});
				} else {
					alert('Error:\\n' + ((e1.error && e1.message) || JSON.stringify(e1)));
				}
			});
		} else {
			// oops, something went wrong
		}
	});
};

exports.loadPerspectives = function() {
	// Delete perspectives loaded from the cloud
	db.deleteRemote();
	
	var loginCallback = function() {
		Cloud.Objects.query({
			classname : 'perspectives'
		}, function(e) {
			if (e.success) {
				for (var i = 0; i < e.perspectives.length; i++) {
					var perspective = e.perspectives[i];
					db.addLocation(perspective.id, perspective.photoId,  "", perspective.thumbsUp, perspective.thumbsDown, perspective.locLong, perspective.locLat, false);
				}
				
				Ti.App.fireEvent("databaseUpdated");
			} else {
				alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	};

	if (!loggedIn) {
		exports.login(loginCallback);
	} else {
		loginCallback.call();
	}
};

exports.loadPhotoId = function(savedPhotoId, photoLoadCallback) {
	Cloud.Photos.show({
		photo_id : savedPhotoId
	}, photoLoadCallback);
};
