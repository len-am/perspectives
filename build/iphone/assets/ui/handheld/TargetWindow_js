function TargetWindow(title) {
	
	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor : 'white'
	});

	var descriptionLabel = Ti.UI.createLabel({
		color : '#900',
		font : {
			fontSize : 12
		},
		// shadowColor : '#aaa',
		// shadowOffset : {
			// x : 5,
			// y : 5
		// },
		text : 'Target: The Appcelerator Logo\nA sign of both innovation and humility',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 10,
		width : 'auto',
		height : 'auto'
	});
	self.add(descriptionLabel);
	
	var showLoc = Ti.UI.createButton({
		height : 44,
		width : 200,
		title : L('Show Location'),
		top : 70
	});
	self.add(showLoc);

	var takePicture = Ti.UI.createButton({
		height : 44,
		width : 200,
		title : L('Take Picture'),
		top : 120
	});
	self.add(takePicture);
	
	showLoc.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		// self.containingTab.open(Ti.UI.createWindow({
			// title : L('Target'),
			// backgroundColor : 'white'
		// }));
	});

	return self;
};

module.exports = TargetWindow; 