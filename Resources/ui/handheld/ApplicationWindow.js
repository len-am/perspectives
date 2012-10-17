Ti.Geolocation.purpose = 'Sharing a new perspective';
var acs = require('lib/acs');

function ApplicationWindow(title, _isSocial) {
	var self = Ti.UI.createWindow({
		title : title,
		barColor : '#556b2f',
		backgroundColor : 'black'
	});

	if (!_isSocial) {
		var PerspectivesTableView = require('ui/common/PerspectivesTableView');
		var perspectivesTable = new PerspectivesTableView(self);

		self.add(perspectivesTable);

		// button.addEventListener('click', function() {
		// //containingTab attribute must be set by parent tab group on
		// //the window for this work
		// var TargetWindow = require('ui/handheld/TargetWindow');
		// self.containingTab.open(new TargetWindow());
		// });
	} else {
		var newButton = Ti.UI.createButton({
			title : L('newButton'),
			top : 10,
			width : 250,
			height : Ti.UI.SIZE,
			color : '#556b2f'
		});
		newButton.addEventListener('click', newPerspective);
		self.add(newButton);
	}

	return self;
};

module.exports = ApplicationWindow;

var newPerspective = function() {
	if (Ti.Media.isCameraSupported) {
		Ti.Media.showCamera({
			success : function(event) {
				var image = event.media;

				//save for future use
				getCurrentLocation(function(lng, lat) {
					acs.uploadPhoto(image, lng, lat);
				});
			},
			cancel : function() {
			},
			error : function(error) {
				var a = Ti.UI.createAlertDialog({
					title : L('camera_error')
				});
				if (error.code == Ti.Media.NO_CAMERA) {
					a.setMessage(L('camera_error_details'));
				} else {
					a.setMessage('Unexpected error: ' + error.code);
				}
				a.show();
			},
			saveToPhotoGallery : true,
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	} else {
		Ti.Media.openPhotoGallery({
			success : function(event) {
				var image = event.media;

				//save for future use
				getCurrentLocation(function(lng, lat) {
					acs.uploadPhoto(image, lng, lat);
				});
			},
			cancel : function() {
			},
			error : function(error) {
				var a = Ti.UI.createAlertDialog({
					title : L('camera_error')
				});
				if (error.code == Ti.Media.NO_CAMERA) {
					a.setMessage(L('camera_error_details'));
				} else {
					a.setMessage('Unexpected error: ' + error.code);
				}
				a.show();
			},
			saveToPhotoGallery : false,
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
};

module.exports.newPerspective = newPerspective; 

var getCurrentLocation = function(callback) {
	if (Ti.Geolocation.locationServicesEnabled) {
		if (Ti.Platform.osname === 'android') {
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
		} else {
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		}
		Ti.Geolocation.getCurrentPosition(function(e) {
			if (!e.error) {
				var lng = e.coords.longitude;
				var lat = e.coords.latitude;
				callback(lng, lat);
			} else {
				Ti.UI.createAlertDialog({
					title : L('geo_error'),
					message : 'Geolocation failed. Do you have a location set on your Android emulator?'
				}).show();
			}
		});
	} else {
		Ti.UI.createAlertDialog({
			title : L('geo_error'),
			message : L('geo_error_details')
		}).show();
	}
};
module.exports.getCurrentLocation = getCurrentLocation; 