var main = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789+/';
var map = {};
createMap();
function createMap() {
	var _list = main.split('');
	for (var i=0,len=_list.length;i<len;i++) {
		map[Number(i).toString(2)] = _list[i];
	}
}

function getChart(str) {
	return createMap[str];
}

function getResult(str) {
	var result = '';
	while(str.length) {
		result += getChart(str.splice(0, 8));
	}
}