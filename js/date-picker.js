var dayMapping = {
	0: '日',
	1: '一',
	2: '二',
	3: '三',
	4: '四',
	5: '五',
	6: '六'
};

(function (w) {
	var pDateEles = document.querySelectorAll('p-date-picker');
	if (pDateEles && pDateEles.length) {
		pDateEles.forEach(function (item, index) {
			initDom(item);
		})
	}
})(window);

function initDom(eleCont) {
	var input = document.createElement('input');
	input.setAttribute('type', 'date');
	input.classList = 'time-field';
	eleCont.appendChild(input);
	var span = document.createElement('span');
	eleCont.appendChild(span);
	input.addEventListener('change', function (e) {
		var ele = e.target;
		var value = ele.value;
		var _date = new Date(value);
		var dates = value.split('-');
		var result = `${dates[0]}年${dates[1]}月${dates[2]}日 星期${dayMapping[_date.getDay()]}`;
		ele.nextSibling.innerHTML = result;
	})
}