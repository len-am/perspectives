var MapWindow = function(_perspective) {
	
	var win = Ti.UI.createWindow({
		title:"Examine the Perspective",
		barColor: '#6d0a0c',
		backgroundColor:'#fff'
	});
	
	var ann = Ti.Map.createAnnotation({
		latitude:_perspective.locLat,
		longitude:_perspective.locLong,
		title:"Perspective",
		pincolor:Ti.Map.ANNOTATION_RED,
		animate:true
	});
	
	var mapview = Ti.Map.createView({
		mapType: Ti.Map.STANDARD_TYPE,
		region:{latitude:_perspective.locLat, longitude:_perspective.locLong, latitudeDelta:0.1, longitudeDelta:0.1},
		animate:true,
		regionFit:true,
		userLocation:false,
		annotations:[ann]
	});
	
	win.add(mapview);

	var osname = Ti.Platform.osname;
	if (osname === 'iphone' || osname === 'ipad') {
		var b = Titanium.UI.createButton({
			title:L('close'),
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
		b.addEventListener('click',function() {
			win.close();
		});
		win.setLeftNavButton(b);
	}
	
	return win;
};
module.exports = MapWindow