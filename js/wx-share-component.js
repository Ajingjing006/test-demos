(function (w) {
	var d = w.document;
	var nameSpace = 'wx-share-';
	var params;
	var ShareComponent = function (options) {
		params = {
			title: options.title?options.title: '分享标题',
			description: options.description?options.description: '分享描述',
			picture: options.picture?options.picture: '',//图片链接
			QRCode: options.QRCode?options.QRCode: '',//用于生成二维码的url
			content: options.content?options.content: '',//点击分享后跳转的url
			contentType: (typeof options.contentType != 'undefined')?options.contentType: 0,//分享类型，0为分享链接，1为分享图片
			shareType: (typeof options.shareType != 'undefined')?options.shareType: 0,//0分享微信好友，1分享朋友圈，2分享二维码
			productName: options.productName?options.productName: ''//产品名称
		}
	}
	
	function open() {
		showMask();
		shareContDisplay();
	}
	
	function close() {
		hideMask();
		shareContHide();
	}
	
	function showMask() {
		var mask = d.querySelector('.' + nameSpace + 'mask');
		mask.className = nameSpace + 'mask';
		var t = setTimeout(function () {
			mask.classList.add('show');
			clearTimeout(t);
			t = null;
		}, 0);		
	}
	
	function hideMask() {
		var mask = d.querySelector('.' + nameSpace + 'mask');
		mask.className = 'wx-share-mask';
		var t = setTimeout(function () {
			mask.classList.add('tech-hide');
			clearTimeout(t);
			t = null;
		}, 100);
	}
	
	function shareContDisplay() {
		var ele = d.querySelector('.' + nameSpace + 'main-cont');
		ele.classList.remove('tech-hide');
		var t = setTimeout(function () {
			ele.classList.add('open');
			clearTimeout(t);
			t = null;
		}, 190);
	}
	
	function shareContHide() {
		var ele = d.querySelector('.' + nameSpace + 'main-cont');
		ele.className = nameSpace + 'main-cont';
		var t = setTimeout(function () {
			ele.classList.add('tech-hide');
			clearTimeout(t);
			t = null;
		}, 190);
	}
	
	function init() {
		var bodyEle = d.querySelector('body');
		
		//添加遮罩层
		var mask = d.createElement('div');
		mask.className = nameSpace + 'mask';
		bodyEle.appendChild(mask);
		
		mask.addEventListener('touchmove', function (e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
		})
		
		mask.addEventListener('click', function (e) {
			close();
		})
		
		//创建分享组件
		var parentCont = d.createElement('div');
		parentCont.classList.add('tech-hide');
		parentCont.classList.add(nameSpace + 'main-cont');
		bodyEle.appendChild(parentCont);
		
		parentCont.innerHTML = '<div class="share-title">快分享照片给好友吧</div>'
							+  '<div class="button-bar">'
							+  	'<div class="share-btn share-btn1" onclick="javascript: ShareComponent.shareHandler(0)">微信好友</div>'
							+  	'<div class="share-btn share-btn2" onclick="javascript: ShareComponent.shareHandler(1)">朋友圈</div>'
							+  '</div>';
	}
	ShareComponent.prototype.open = function (callback) {
		open();
		setTimeout(function () {
			if (typeof callback == 'function') {
				callback();
			}
		}, 240);
	}
	ShareComponent.shareHandler = function (type) {
		close();
		if (typeof TMFJSBridge != 'undefined') {
			setTimeout(function() {
				params.shareType = type;
				TMFJSBridge.invoke("loadWXShare", params, function(data) {});
				console.log('try to invoke share interface in app')
			}, 200);
		}
	}
	window.ShareComponent = ShareComponent;
	init();
})(window)