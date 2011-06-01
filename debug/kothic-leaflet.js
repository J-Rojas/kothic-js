L.TileLayer.Kothic = L.TileLayer.Canvas.extend({
	options: {
		tileSize: 256 * 4,
		minZoom: 2,
		maxZoom: 22,
		updateWhenIdle: true,
		unloadInvisibleTiles: true
	},
	
	initialize: function(options) {
		L.Util.setOptions(this, options);
		
		var canvases = this._canvases = {};
		
		window.onKothicDataResponse = function(data, zoom, x, y) {
			var key = [zoom, x, y].join('/'),
				canvas = canvases[key];
			Kothic.render(canvas, data, zoom + 2);
		};
	},
	
	drawTile: function(canvas, tilePoint, zoom) {
		var key = [(zoom - 2), tilePoint.x, tilePoint.y].join('/');
		this._canvases[key] = canvas;
		this._loadScript('http://osmosnimki.ru/vtile/' + key + '.js');
	},
	
	_loadScript: function(url) {
		var script = document.createElement('script');
		script.src = url;
		script.charset = 'utf-8';
		document.getElementsByTagName('head')[0].appendChild(script);
	}
});