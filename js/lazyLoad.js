'use strict';
(function (w) {
	var watchList = [];
	window.addEventListener('scroll', function () {
		watchList.forEach((item)=>{
			item.nextLoad();
		})
	})
	var defaultObj = {
		rate: 10,
		vh: 10
	}
	var _lazyLoad = function (el, callBack, _options) {
		var options = Object.assign({}, defaultObj, _options);
		this.el = el;
		this.__i = 0;
		this.rate = options.rate;
		this.vh = options.vh;
		this.callBack = callBack || function () {};
		watchList.push(this);
	}
	
	_lazyLoad.prototype.start = function () {
		initDom.bind(this)();
		nextLoad.bind(this)();
	}
	
	_lazyLoad.prototype.nextLoad = nextLoad;
	
	function animationProcess() {
		if (assertNeedLoad.bind(this)()) {
			if (this.__i > this.rate) {
				this.callBack(this.el);
				this.__i = 0;
			}
			this.__i++;
			nextLoad.bind(this)();
		}
	}
	
	function assertNeedLoad() {
		var el = this.el;
		if (el.hasAttribute('finished')) {
			return false;
		}
		if (el.lastChild && el.lastChild.getBoundingClientRect().top - this.vh < screen.height) {
			return true;
		}
		return false;
	}
	
	function nextLoad() {
		var _this = this;
		requestAnimationFrame(function () {
			animationProcess.bind(_this)();
		});
	}
	
	function initDom() {
		var _bottom_line = document.createElement('div');
		_bottom_line.className = '_bottom_node';
		_bottom_line.style.border = 'none';
		_bottom_line.style.height = '0px';
		this.el.appendChild(_bottom_line);
	}
	w._listLazyLoad = _lazyLoad;
})(window);