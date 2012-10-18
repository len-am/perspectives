var DetailWindow = function(_perspective, containingWindow) {
	var acs = require('lib/acs');
	var db = require('lib/db');
	var NAVIBRIDGE = require('ti.navibridge');
	var applicationWindow = require('ui/handheld/ApplicationWindow');

	var win = Ti.UI.createWindow({
		title : "Perspective",
		barColor : '#556b2f',
		backgroundColor : 'transparent',
		backgroundImage : 'images/grain.png'
	});

	var mainView = Ti.UI.createView({
		top : 0,
		width : Ti.UI.SIZE
	});

	win.add(mainView);

	var imgView = Ti.UI.createImageView({
		top : 10,
		image : _perspective.url,
		height : 300,
		width : Ti.UI.SIZE
	});
	mainView.add(imgView);

	var actions = Ti.UI.createWindow({
		layout : 'horizontal',
		width : 200,
		top : 310
	});
	mainView.add(actions);

	var goButton = Ti.UI.createButton({
		title : L('goButton'),
		top : 10,
		width : 60,
		height : Ti.UI.SIZE,
		color : '#556b2f'
	});
	goButton.addEventListener('click', function() {
		var MapWin = require('ui/common/MapWindow');
		var map = new MapWin(_perspective);
		map.open({
			modal : true
		});

		var dialog = Ti.UI.createAlertDialog({
			cancel : 2,
			buttonNames : ['Install', 'Set POI', 'Cancel'],
			message : 'NaviBridge must be installed prior to setting the perspective as the POI',
			title : 'NaviBridge'
		});
		dialog.addEventListener('click', function(e) {
			if (e.index === e.source.cancel) {
				Ti.API.info('The cancel button was clicked');
			}

			switch(e.index) {
				case 0:
					NAVIBRIDGE.installNavi();
					break;
				case 1:
					NAVIBRIDGE.addPOI({
						lat : _perspective.locLat,
						lon : _perspective.locLong
					});
					break;
				case 2:
					return;
			}

			acs.update(_perspective);
		});
		dialog.show();
	});
	actions.add(goButton);

	var photoButton = Ti.UI.createButton({
		title : L('photoButton'),
		top : 10,
		left : 10,
		width : 60,
		height : Ti.UI.SIZE,
		color : '#556b2f'
	});

	photoButton.addEventListener('click', function() {
		applicationWindow.getCurrentLocation(function(lng, lat) {
			if (Math.abs(lng - _perspective.locLong) > .002 || Math.abs(lat - _perspective.locLat) > .002) {
				var dialog = Ti.UI.createAlertDialog({
					message : 'You are not in range to share. Get a closer perspective and try again.',
					ok : 'Okay',
					title : 'Out of range'
				}).show();
				return;
			}
			containingWindow.newPerspective();
		});
	});
	actions.add(photoButton);

	var voteButton = Ti.UI.createButton({
		title : L('voteButton'),
		top : 10,
		left : 10,
		width : 60,
		height : Ti.UI.SIZE,
		color : '#556b2f'
	});

	voteButton.addEventListener('click', function(e) {
		// Check proximity
		applicationWindow.getCurrentLocation(function(lng, lat) {
			if (Math.abs(lng - _perspective.locLong) > .002 || Math.abs(lat - _perspective.locLat) > .002) {
				var dialog = Ti.UI.createAlertDialog({
					message : 'You are not in range to vote. Get a closer perspective and try again.',
					ok : 'Okay',
					title : 'Out of range'
				}).show();
				return;
			}
			var dialog = Ti.UI.createAlertDialog({
				cancel : 2,
				buttonNames : ['Yes', 'No', 'Cancel'],
				message : 'Did you see a new perspective?',
				title : 'Vote'
			});
			dialog.addEventListener('click', function(e) {
				if (e.index === e.source.cancel) {
					Ti.API.info('The cancel button was clicked');
				}

				switch(e.index) {
					case 0:
						_perspective.thumbsUp++;
						break;
					case 1:
						_perspective.thumbsDown++;
						break;
					case 2:
						return;
				}

				acs.update(_perspective);
			});
			dialog.show();
		});

	});

	actions.add(voteButton);

	win.update = function() {
		_perspective = db.queryPerspective(_perspective.id);
		imgView.image = _perspective.url;
	}

	return win;
};

module.exports = DetailWindow;
