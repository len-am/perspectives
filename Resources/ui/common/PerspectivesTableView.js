/*
 Following the model demonstrated in ui/common/ApplicationTabGroup
 create a constructor for the bounty tableview component. This module
 should return an instantiable function (that you'll use with "new").
 It should accept a boolean property to denote whether this table will
 list captured or at-large fugitives.
 */
var db = require('lib/db');
var acs = require('lib/acs');

var PerspectivesTableView = function(_self) {
	acs.loadPerspectives();

	var tv = Ti.UI.createTableView({
		backgroundColor : 'transparent',
		separatorColor : 'transparent'
	});

	function populateData(e) {
		if (typeof(e.acsId) != 'undefined')
		{
			return;
		}
		
		var results = db.list();

		var perspectiveEntries = [];

		for (var i = 0; i < results.length; i++) {
			perspectiveEntries.push(new PerspectiveEntry(_self, results[i]));
		}

		tv.setData(perspectiveEntries);
	}

	//run initial query
	populateData({});

	Ti.App.addEventListener('databaseUpdated', populateData);

	return tv;
};

var PerspectiveEntry = function(_self, _perspective) {
	var entry = Ti.UI.createTableViewRow({
		top : 10,
		layout : 'vertical',
		perspective : _perspective,
		selectedBackgroundColor : '#556b2f'
	});
	var containerView = Ti.UI.createView({
		backgroundColor: "white",
		top: 10,
		height : 110,
		width: 160
	});
	
	entry.add(containerView);
	
	var view = Titanium.UI.createImageView({
		image : _perspective.url,
		height : 100,
		width: 150
	});

	if (_perspective.photoId != "" && _perspective.url == "") {
		acs.loadPhotoId(_perspective.photoId, function(e) {
			view.image = e.photos[0].urls.medium_640;
			_perspective.url = view.image;
			db.update(_perspective, true);
		});
	}
	
	containerView.add(view);

	var ratings = Titanium.UI.createView({
		height : 20,
		width : 100,
		layout : 'horizontal'
	});

	var thumbsUp = Titanium.UI.createImageView({
		image : "images/thumb_up.png",
		width : 20
	});
	ratings.add(thumbsUp);

	var upCount = Titanium.UI.createLabel({
		text : _perspective.thumbsUp,
		width : 30,
		color : 'white'
	});
	ratings.add(upCount);

	var thumbsDown = Titanium.UI.createImageView({
		image : "images/thumb_down.png",
		width : 20
	});
	ratings.add(thumbsDown);

	var downCount = Titanium.UI.createLabel({
		text : _perspective.thumbsDown,
		width : 30,
		color : 'white'
	});
	ratings.add(downCount);

	entry.add(ratings);

	entry.addEventListener('click', function(_e) {
		var DetailWindow = require('ui/common/DetailWindow');
		var details = new DetailWindow(_e.row.perspective, _self);
		Ti.App.addEventListener('databaseUpdated', function(e){
			if (typeof(e) != 'undefined' && e.acsId == _e.row.perspective.acsId)
			{
				details.update();
			}
		});
		_self.containingTab.open(details);
	});
	return entry;
};

module.exports = PerspectivesTableView;
