/**
 * TD fn time 18.4.19
 * meng md
 */
(function(w, undefined) {
	// if (w.talkingdata && typeof w.talkingdata.onload === "function") {
	// 	return;
	// }
	w.talkingdata = {
		configData: [],
		configInfo: {
			platform: "",
			version: ""
		},
		analyzeDom: new AnalyzeDom(),
		onload: function(data) {
			talkingdata.configInfo = data;
			//init
			// AnalyzeDom.pluginForInit();

			document.addEventListener(
				"click",
				function(e) {
					// let elementPath = AnalyzeDom.elementPath(e.target);
					//find for outer
					let elementPath = AnalyzeDom.getOuterPath(e.target);
					for (let index in talkingdata.configData) {
						let _cd = talkingdata.configData[index];
						let sourcePath = _cd.path;
						if (/^\"(.+)\"$/.test(sourcePath)) {
							sourcePath = RegExp.$1;
						}
						let flag = elementPath.some(item => item === sourcePath);

						if (flag) {
							let eventId = _cd.id;
							console.log("native event called! event id " + eventId);
							talkingdata.callNative(talkingdata.configInfo.platform, eventId);

							break;
						}
					}
				},
				false
			);
		},
		getConfig: function(
			webviewID,
			webviewX,
			webviewY,
			webviewWidth,
			webviewHeight
		) {
			w._webviewID = webviewID;
			let elements = talkingdata.analyzeDom.analyze(
				document.querySelector("body")
			);

			let config = {
				webviewID: webviewID,
				webviewX: webviewX,
				webviewY: webviewY,
				webviewWidth: webviewWidth,
				webviewHeight: webviewHeight,
				elements: elements
			};
			let platform = talkingdata.configInfo.platform;
			let version = Number(talkingdata.configInfo.version);
			if (platform == "android" && version < 19) {
				return w.getPath.callback(JSON.stringify(config));
			}

			return config;
		},
		setConfig: function(config) {
			console.log(100, config);
			talkingdata.analyzeDom.analyzeSet(document.querySelector("body"));
			talkingdata.configData = JSON.parse(config);
		},
		callNative: function(platform, eventId) {
			if (platform == "android") {
				w.bubble.onFireHybridEvent(eventId);
			} else if (platform == "iOS") {
				let commend = {
					functionName: "trackHybridCodelessEvent",
					arguments: [eventId]
				};
				let jsonStr = JSON.stringify(commend);
				w.location.href = "talkingdata:" + jsonStr;
			}
		}
	};

	/**
	 * fn | analyze dom | meng
	 */
	function AnalyzeDom() {}
	// filter rules
	AnalyzeDom.isHidden = function(el) {
		let style = w.getComputedStyle(el);
		return style.display === "none" || style.visibility === "hidden";
	};

	AnalyzeDom.isVisible = function(el) {
		let rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (w.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (w.innerWidth || document.documentElement.clientWidth)
		);
	};

	AnalyzeDom.getRelativePos = function(el) {
		const rect = el.getBoundingClientRect();
		return rect;
	};

	AnalyzeDom.getStyles = function(el) {
		return w.getComputedStyle(el);
	};

	//report match for outer level 5
	AnalyzeDom.getOuterPath = function(el, len = 5) {
		if (!el.getAttribute("data-td-node")) {
			return [];
		}
		let i = 0,
			paths = [];
		while (i < len && el) {
			let tnode = el.getAttribute("data-td-node");
			try {
				tnode && paths.push(JSON.parse(tnode).path);
			} catch (e) {
				console.log(e);
			}
			i++;
			el = el.parentNode;
		}
		return paths;
	};

	AnalyzeDom.isExclude = function(nodeName) {
		let exArray = ["BR", "SCRIPT"];
		for (let index in exArray) {
			if (exArray[index] == nodeName) {
				return true;
			}
		}
		return false;
	};

	AnalyzeDom.elementPath = function(el) {
		let _path = "";
		while (el && el.nodeType == 1) {
			let indexStr = el.index == null ? "" : "[" + el.index + "]";
			_path += el.nodeName + indexStr + "/";
			el = el["parentNode"];
		}
		return _path
			.substr(0, _path.length - 1)
			.split("/")
			.reverse()
			.join("/");
	};

	AnalyzeDom.hashCode = function(str) {
		var h = 0;
		var len = str.length;
		var t = 2147483648;
		for (var i = 0; i < len; i++) {
			h = 31 * h + str.charCodeAt(i);
			if (h > 2147483647) h %= t;
		}
		return h;
	};

	//plugin for fix
	AnalyzeDom.pluginForFix = function(el) {
		const fix = [
			"copyright section",
			// "parbase slideshow2 section2",
			"section slideshow3"
		];
		for (const iterator of fix) {
			if (iterator === el.className) {
				switch (iterator) {
					case fix[0]:
						el.style.height = 0;
						break;
					case fix[1]:
						el.style.display = "none";
						break;
						// case fix[2]:
						//   el.style.display = "none";
						//   break;
				}
			}
		}
	};

	//.popup-main .pure-g .text-remind .mCSB_container .mCustomScrollBox
	AnalyzeDom.pluginForInit = function() {
		const fix = [".copyright", ".fix"];
		for (let i = 0; i < fix.length; i++) {
			let el = document.querySelector(fix[i]);
			if (el) {
				switch (fix[i]) {
					case fix[0]:
						el.style.height = 0;
						break;
					case fix[1]:
						el.style.display = "none";
						break;
					default:
						el.style.height = 0;
				}
			}
		}
	};

	// model
	AnalyzeDom.filterDomKey = function(el, level) {
		let path = AnalyzeDom.elementPath(el);
		const rect = AnalyzeDom.getRelativePos(el);
		const styles = AnalyzeDom.getStyles(el);
		//console.log(w._webviewID)
		const nel = {
			width: el.offsetWidth,
			height: el.offsetHeight,
			left: rect.left,
			top: rect.top,
			nodeName: el.nodeName,
			location: el.getAttribute("href"),
			path: path,
			level: level,
			className: el.className,
			hashCode: "h5_" + AnalyzeDom.hashCode(w._webviewID + path),
			type: "h5_element",
			zIndex: styles.zIndex,
			webview_id: w._webviewID,
			children: Array.prototype.slice.call(el.children)
		};
		//fix
		// AnalyzeDom.pluginForFix(el);
		let _nel = {
			path: nel.path,
			level: nel.level,
			nodeName: nel.nodeName,
			className: nel.className
		};
		// console.log(nel);
		nel && el.setAttribute("data-td-node", AnalyzeDom.stringifyNodes(_nel));
		return nel;
	};

	AnalyzeDom.stringifyNodes = function(node) {
		let cache = [];
		let _node = JSON.stringify(node, function(key, value) {
			if (typeof value === "object" && value !== null) {
				if (cache.indexOf(value) !== -1) {
					// Circular reference found, discard key
					return;
				}
				// Store value in our collection
				cache.push(value);
			}
			return value;
		});
		cache = null; // Enable garbage collection
		return _node;
	};

	AnalyzeDom.execLevel = function(els, index = "") {
		for (let i = 0; i < els.length; i++) {
			if (
				!AnalyzeDom.isExclude(els[i].nodeName) &&
				!AnalyzeDom.isHidden(els[i])
			) {
				try {
					els[i].index = i;
					els[i] = AnalyzeDom.filterDomKey(els[i], `${index}${i}`);
				} catch (e) {
					console.log(e);
				}
			} else {
				Array.prototype.splice.apply(els, [i, 1]);
				i--;
				continue;
			}
			if (els[i].children && els[i].children.length) {
				AnalyzeDom.execLevel(els[i].children, `${index}${i}`);
			}
		}
	};

	AnalyzeDom.execSet = function(els, index = "") {
		for (let i = 0; i < els.length; i++) {
			if (
				!AnalyzeDom.isExclude(els[i].nodeName) &&
				!AnalyzeDom.isHidden(els[i])
			) {
				try {
					els[i].index = i;
					let path = AnalyzeDom.elementPath(els[i]);
					els[i].setAttribute(
						"data-td-node",
						AnalyzeDom.stringifyNodes({
							path: path
						})
					);
				} catch (e) {
					console.log(e);
				}
			} else {
				Array.prototype.splice.apply(els, [i, 1]);
				i--;
				continue;
			}
			if (els[i].children && els[i].children.length) {
				AnalyzeDom.execSet([...els[i].children], `${index}${i}`);
			}
		}
	};

	AnalyzeDom.findLevel = function(els, mathLevel, cb) {
		for (let i = 0; i < els.length; i++) {
			let _el = els[i];
			if (_el.level === mathLevel) {
				cb();
				return;
			}
			if (els[i].children && els[i].children.length) {
				AnalyzeDom.findLevel(els[i].children, mathLevel, cb);
			}
		}
	};

	AnalyzeDom.flatData = function(els, container) {
		for (let i = 0; i < els.length; i++) {
			Array.prototype.push.call(container, els[i]);
			if (els[i].children && els[i].children.length) {
				AnalyzeDom.flatData(els[i].children, container);
			}
		}
	};

	AnalyzeDom.prototype.analyzeSet = function(dom) {
		let _dom = [dom];
		AnalyzeDom.execSet(_dom);
	};

	AnalyzeDom.prototype.analyze = function(dom) {
		//  console.log(
		//    dom,
		//    [].slice.call(dom.children)
		//    // [...dom.childNodes],
		//    // Array.isArray([...dom.children])
		//  );
		let _dom = [dom];
		AnalyzeDom.execLevel(_dom);

		//flat data for old
		const _flat = [];
		AnalyzeDom.flatData(_dom[0].children, _flat);
		return _flat;
	};

	if (window.talkingdata && window.talkingdata.setConfig) {
	    window.talkingdata.setConfig('[{"id":"f7a5df8f67e04897b1a55844fc92570b","name":"aaa","appVersion":"5","actionid":1,"defined_version":"2.7.0","updateTime":"2018-05-28 14:59:21.0","type":"click","path":"HTML\/BODY[0]\/DIV[0]\/DIV[3]\/DIV[0]\/DIV[0]\/A[0]\/DIV[0]\/DIV[0]\/IMG[0]\"}]');
	}
	window.talkingdata.onload({
	    "platform": "android"
	})
})(window);
