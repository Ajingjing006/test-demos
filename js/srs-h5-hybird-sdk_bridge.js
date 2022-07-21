(function (root, factory) {
	if (typeof define === 'function' && define.amd && define.length) {
		//AMD
		// define("SRSAPP",factory);
		window.SRSAPP = factory(window);
	} else if (typeof exports === 'object') {
		//CommonJS
		module.exports = factory();
	} else {
		root.SRSAPP = factory(root);
	}
})(this, function (root) {
	var SRSAPP = (root && root.SRSAPP)? root.SRSAPP: {};
	var needInitPageSend = false;
	SRSAPP.onEvent = function (eventId, eventLabel, eventParams) {
		eventId = eventId || "";
		eventLabel = eventLabel || "";
		eventParams = eventParams || {};
		setTimeout(function () {
			SRSAPP.onEvent(eventId, eventLabel, eventParams);
		}, 200);
	}

	//增加标记，用于监听事件当前窗口只会创建一次；避免页面默认引入和模块化引入导致的监听事件重复执行
	if (!window['_SRSAPP_INIT_DONE_TAG']) {
		addSRSEventListener();
		needInitPageSend = true;
		window['_SRSAPP_INIT_DONE_TAG'] = 1;
	}

	var srsUserAgentInfo = navigator.userAgent;
	var isAppleDevice = srsUserAgentInfo && (
		srsUserAgentInfo.toLowerCase().indexOf('iphone') != -1 ||
		srsUserAgentInfo.toLowerCase().indexOf('ipad') != -1 ||
		srsUserAgentInfo.toLowerCase().indexOf('ipod') != -1);

	if (isAppleDevice) {
		var __SRSIOSWkWeb__ = window.webkit &&
			window.webkit.messageHandlers &&
			window.webkit.messageHandlers.SRSHybridBridge &&
			window.webkit.messageHandlers.SRSHybridBridge.postMessage;

		if (window.addEventListener) { //W3C
			if (__SRSIOSWkWeb__ != undefined) {
				window.addEventListener('pageshow', function () {
					delayLoadSRSSdk();
				});
			} else {
				window.addEventListener('load', function () {
					delayLoadSRSSdk();
				});
			}
		} else if (window.attachEvent) { //IE
			if (__SRSIOSWkWeb__ != undefined) {
				window.attachEvent("onpageshow", function () {
					delayLoadSRSSdk();
				});
			} else {
				window.attachEvent("onload", function () {
					delayLoadSRSSdk();
				});
			}
		} else { //DOM
			if (__SRSIOSWkWeb__ != undefined) {
				window['onpageshow'] = function () {
					delayLoadSRSSdk();
				};
			} else {
				window['onload'] = function () {
					delayLoadSRSSdk();
				};
			}
		};
	} else {
		loadSRSSdk();
	};

	function delayLoadSRSSdk() {
		setTimeout(function () {
			loadSRSSdk();
		}, 0);
	}

	// 桥梁初始化
	function getSRSBridgeLoader() {
		return window.top.__SRSBridgeLoader__ || {};
	}

	function getOnEventByElem(t) {
		var tagName = t.tagName.toLowerCase();
		if (tagName == "body" || tagName == "html") return;
		if (t.hasAttribute("td-event")) {
			var n = t.getAttribute("td-event");
			onEventByValue(n);
		} else t.parentNode && getOnEventByElem(t.parentNode);
	};

	function onEventByValue(e) {
		if (e) {
			var t = e.split(","),
				n = t.length,
				r = "",
				i = "";
			n == 1 ? r = t[0] : n == 2 && (r = t[0], i = t[1]),
				SRSAPP.onEvent(r, i)
		}
	};

	function onEventByElemAttr(t) {
		var n = t.target || t.srcElement;
		getOnEventByElem(n);
	}

	function addSRSEventListener() {
		var body = window.document.body || window.document;
		if (body.addEventListener) {
			body.addEventListener("click", onEventByElemAttr, !1);
		} else if (body.attachEvent) {
			body.attachEvent("onclick", onEventByElemAttr);
		} else {
			body["onclick"] = onEventByElemAttr;
		};
	}

	function loadSRSSdk() {
		if (srsUserAgentInfo.indexOf("MSIE") > 0) { //IE内核
			if (srsUserAgentInfo.indexOf("MSIE 6.0") > 0) {
				return;
			} else if (srsUserAgentInfo.indexOf("MSIE 7.0") > 0) {
				return;
			};
		};

		//页面打开事件采集
		var __SRSIsIOSUIWeb__, __SRSIsAndroid__, __SRSIsH5__;
		if (needInitPageSend) {
			var pageData = [window.location.href];
			var pageIdEles = document.querySelectorAll('[data-pageId]');
			if (pageIdEles.length) {
				pageData.push(pageIdEles[0].getAttribute('data-pageId'));
			} 
			setTimeout(hybridEventExec("onPage", pageData), 100);
			needInitPageSend = false;
		}

		function hybridEventExec(functionName, _arguments) {
			__SRSIsIOSUIWeb__ = getSRSBridgeLoader() && getSRSBridgeLoader().loadUrl;
			__SRSIsAndroid__ = window.metaObj && window.metaObj.srsNativeMethod;
			__SRSIsH5__ = !__SRSIsIOSUIWeb__ && !__SRSIOSWkWeb__ && !__SRSIsAndroid__;
			if (__SRSIsH5__) {
				return;
			} else {
				var pageOnJson = {
					functionName: functionName,
					arguments: _arguments
				},
					pageOnjsonString = JSON.stringify(pageOnJson),
					pageOnEventString = "siriusTrackEvent:" + pageOnjsonString;

				if (__SRSIsIOSUIWeb__) {
					getSRSBridgeLoader().loadUrl(pageOnEventString);
				} else if (__SRSIOSWkWeb__) {
					window.webkit.messageHandlers.SRSHybridBridge.postMessage(pageOnEventString);
				} else if (__SRSIsAndroid__) {
					window.metaObj.srsNativeMethod("JSSiriusTrackEvent", pageOnjsonString, "", "");
				}
			}
		}

		SRSAPP.onEvent = function (eventId, label, paramters) {
			console.log('log')
			if (arguments.length > 0) {
				var functionName = "",
					_arguments = [];
				if (eventId != undefined) {
					eventId = typeof eventId != "string" ? JSON.stringify(eventId) : eventId;
					_arguments.push(eventId);
				}
				if (label != undefined) {
					label = (typeof label != "string" ? JSON.stringify(label) : label);
					_arguments.push(label);
				};
				var isParamtersLegal = paramters != undefined &&
					typeof paramters == "object" &&
					Object.prototype.toString.call(paramters).toLowerCase() == "[object object]" &&
					!paramters.length;
				if (isParamtersLegal) {
					_arguments.push(paramters);
				};

				if (_arguments.length == 0) return;
				functionName = _arguments.length == 1 ? "onEvent" : _arguments.length == 2 ? "onEventWithLabel" : "onEventWithParameters";
				hybridEventExec(functionName, _arguments);
			};
		}
	}
	return SRSAPP;
});