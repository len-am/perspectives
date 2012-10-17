/*
* A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.
* A starting point for tab-based application with multiple top-level windows.
* Requires Titanium Mobile SDK 1.8.0+.
*
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/

//bootstrap and check dependencies
if (Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

	var Window;
	if (isTablet) {
		Window = require('ui/handheld/ApplicationWindow');
	} else {
		Window = require('ui/handheld/ApplicationWindow');
	}

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');

	var firstWindow = Ti.UI.createWindow({
		title : "New Perspectives",
		barColor : '#556b2f',
		backgroundColor : 'black'
	});

	// Show initial screen
	var firstView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	firstWindow.add(firstView);

	var label = Ti.UI.createLabel({
		text : "One photo can change your entire perspective.\n\nFind a photo that intrigues you and go to the location where the photo was taken - you'll be surprised at what you find.\n\nTap to proceed...",
		color: "white",
		left: 10,
		right: 10
	});

	firstView.add(label);

	firstView.addEventListener('click', function(e) {
		firstWindow.close();
		new ApplicationTabGroup(Window).open();
	});

	firstWindow.open();

})();
