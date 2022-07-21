(function doMarkTool(window) {
	var filterRule = '[data-marked]';
	var markId = 'data-mark-id';
	var index = 1;
	
	var _hFix = 0;
	var _w = window.screen.availWidth;
	var _h = window.screen.availHeight;
	
	var _bottom = _h - _hFix;
	
	var _t = 5;
	var waiting = true;
	var _timer = null;
	var _timerFix = null;
	
	var eleStatusMapping = {};
	
	init();
	
	function init() {
		window.addEventListener('scroll', triggerListener);
		initMapping();
	}
	
	function doFilterAssert() {
		var eles = getAllMarkedEles();
		if (eles && eles.length) {
			eles.forEach(function (el) {
				var _id = el.getAttribute(markId);
				var status = assertPostion(el);
				var _p = eleStatusMapping[_id];
				if (typeof _p === 'undefined') {
					_id = getMarkId();
					eleStatusMapping[_id] = {
						element: el,
						status: status
					}
					if (status) {
						sendMessageToNative({
							id: _id, 
							name: el.getAttribute('name'),
							label: 'HEhe 2'
						});
					}
				} else {
					if (_p.status !== status && status) {
						sendMessageToNative({
							id: _id, 
							name: el.getAttribute('name'),
							label: 'HEhe 3'
						});
					}
					_p.status = status;
				}
			})
		}
	}
	
	function triggerListener() {
		if (waiting) {
			doFilterAssert();
			waiting = false;
		} else {
			if (!_timer) {
				_timer = setTimeout(function () {
					waiting = true;
					_timer = null;
				}, _t);
			}
		}
		if (_timerFix) {
			clearTimeout(_timerFix);
		}
		_timerFix = setTimeout(function () {
			doFilterAssert();
			_timerFix = null;
		}, 300)
	}
	
	function getElementRectangle(el) {
		let rec = el.getClientRects()[0];
		return {
			x: rec.left || rec.x || 0,
			y: rec.top || rec.y || 0,
			w: rec.width,
			h: rec.height
		}
	}
	
	function sendMessageToNative(option) {
		console.log(option.id, option.name, option.label)
	}
	
	function getAllMarkedEles() {
		return document.querySelectorAll(filterRule);
	}
	
	function getMarkId() {
		return index++;
	}
	
	function initMapping() {
		var eles = getAllMarkedEles();
		if (eles && eles.length) {
			eles.forEach(function (el, index) {
				var _id = getMarkId();
				el.setAttribute(markId, _id);
				var status = assertPostion(el);
				eleStatusMapping[_id] = {
					element: el,
					status: status
				}
				if (status) {
					sendMessageToNative({
						id: _id, 
						name: el.getAttribute('name'),
						label: 'HEhe 1'
					});
				}
			})
		}
	}
	
	function assertPostion(el) {
		var positon = getElementRectangle(el);
		if (positon.x >= 0 && positon.x <= _w 
			&& (positon.x + positon.w) >=0 && (positon.x + positon.w) <=_w 
			&& positon.y >= 0 && positon.y <= _bottom 
			&& (positon.y + positon.h) >=0 && (positon.y + positon.h) <= _bottom ) {
			return true;
		}
		return false;
	}
})(window)