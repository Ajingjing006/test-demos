;
(function(context, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		window.top.cfcasipKeyboard = factory();
	}
})(this, function() {
	var keyboardType = {
		'KEYBOARD_TYPE_COMPLETE': KEYBOARD_TYPE_COMPLETE, //全键盘
		'KEYBOARD_TYPE_NUMBER': KEYBOARD_TYPE_NUMBER, //数字话键盘
		'KEYBOARD_TYPE_IDENTITY': KEYBOARD_TYPE_IDENTITY, //身份证键盘
		'KEYBOARD_TYPE_NUMBER_DECIMAL': KEYBOARD_TYPE_NUMBER_DECIMAL //含小数点数字键盘
	}
	var keyboardSortType = {
		'KEYBOARD_DISORDER_NONE': KEYBOARD_DISORDER_NONE, //正常排序
		'KEYBOARD_DISORDER_ALL': KEYBOARD_DISORDER_ALL, //全部乱序
		'KEYBOARD_DISORDER_ONLY_DIGITAL': KEYBOARD_DISORDER_ONLY_DIGITAL, //数字乱序
	}
	var keyBoardmapping = {}; //输入框id绑定键盘实例
	var inputKeyboardLimitMapping = {}; //输入框id绑定的输入长度限制,乱序类型
	var currentCoursor; //光标句柄存储
	var _keyboard = {
		TYPE: keyboardType,
		SORT: keyboardSortType,
		initIdentityKeyboard: function(options) {
			var id = options.elID; //绑定输入元素的id，必填项
			if (id) {
				var doneCallBack = typeof options.doneCallBack === 'function' ? options.doneCallBack : function() {};
				var changeCallback = typeof options.changeCallback === 'function' ? options.changeCallback : function() {};
				var showCallback = typeof options.showCallback === 'function' ? options.showCallback : function() {};
				var hideCallback = typeof options.hideCallback === 'function' ? options.hideCallback : function() {};
				var type = options.type;
				var cursorColor = typeof options.cursorColor === 'string' ? options.cursorColor : '#00f';
				inputKeyboardLimitMapping[id] = {};
				if (typeof options.maxLength !== 'undefined') {
					inputKeyboardLimitMapping[id]['maxLength'] = options.maxLength;
				}
				if (typeof options.minLength !== 'undefined') {
					inputKeyboardLimitMapping[id]['minLength'] = options.minLength;
				}
				if (typeof options.sort !== 'undefined') {
					inputKeyboardLimitMapping[id]['sort'] = options.sort;
				}
				var _keyboard_instance = getInstanceKeyboardByInputId(id, type);
				_keyboard_instance.serverRandom = options.serverRandom;
				_keyboard_instance.type = type;
				_keyboard_instance.bindInputBox(id);
				_keyboard_instance.setDoneCallback((function(ins, callback) {
					return function(sipBoxId) { //点击完成键监听
						callback();
					}
				})(_keyboard_instance, doneCallBack));
				_keyboard_instance.setInputChangeCallback((function(ins, callback) {
					return function(sipBoxId, type, length) { //输入改变监听
						if (assertGridValue(sipBoxId) && length >= 0) {
							updateGridValue(document.getElementById(sipBoxId), ins.getEncryptState(sipBoxId));
						}
						document.querySelector('#' + sipBoxId).dispatchEvent('valueChange', {
							length
						})
						callback();
					};
				})(_keyboard_instance, changeCallback));
				_keyboard_instance.setKeyboardShowCallback((function(ins) {
					return function(keyboard, sipBoxId) { // 键盘显示回调
					};
				})(_keyboard_instance));
				_keyboard_instance.setKeyboardHideCallback((function(ins) {
					return function(keyboard, sipBoxId) { // 键盘隐藏回调

					}
				})(_keyboard_instance));

				_keyboard_instance.hideKeyboard();
				initSipBox(id, cursorColor);

				//其他工具事件
				//清空输入值
				_keyboard_instance.clearAll = function(inputID) {
					var _keyboard = getInstanceKeyboardByInputId(inputID);
					if (_keyboard) {
						_keyboard_instance.clearInputValue(inputID);
					}
					if (assertGridValue(inputID)) {
						updateGridValue(document.getElementById(inputID));
					}
				}
				//比较两个输入框的内容是否一致
				_keyboard_instance.checkEqual = checkEqual;
				//获取输入的值
				_keyboard_instance.getEncrypt = getEncrypt;
				return _keyboard_instance;
			}
		},
		bindCheckKeyBoard: bindCheckKeyBoard
	}

	function getInstanceKeyboardByInputId(id, type) {
		var result = keyBoardmapping[id];
		if (!result) {
			result = keyBoardmapping[id] = new CFCAKeyboard(type);
		}
		return result;
	}

	//判断密码输入框是网格密码样式
	function assertGridValue(eleId) {
		var result = 0;
		document.querySelector('#' + eleId).parentNode.childNodes.forEach(function(item, index) {
			if (item.classList.contains('grid-sip')) {
				result++;
				return;
			}
		})
		return result > 0;
	}

	function setConfigKeyboardBeforeDisplay(_keyboard, sipboxId) {
		_keyboard.bindInputBox(sipboxId);

		_keyboard.setCipherType(CIPHER_TYPE_SM2, sipboxId);
		if (typeof inputKeyboardLimitMapping[sipboxId]['maxLength'] !== 'undefined') {
			_keyboard.setMaxLength(inputKeyboardLimitMapping[sipboxId]['maxLength']);
		}
		if (typeof inputKeyboardLimitMapping[sipboxId]['minLength'] !== 'undefined') {
			_keyboard.setMinLength(inputKeyboardLimitMapping[sipboxId]['minLength']);
		}

		if (typeof inputKeyboardLimitMapping[sipboxId]['sort'] !== 'undefined') {
			_keyboard.setRandomType(inputKeyboardLimitMapping[sipboxId]['sort'], sipboxId);
		} else {
			_keyboard.setRandomType(KEYBOARD_DISORDER_ONLY_DIGITAL, sipboxId);
		}

		setServerRandom(_keyboard, sipboxId);
		if (!_keyboard.isShowing()) {
			setTimeout(function() {
				_keyboard.showKeyboard();
			}, 300);
		}
	}

	//初始化输入框
	function initSipBox(sipboxId, cursorColor) {
		document.querySelector('#' + sipboxId).addEventListener('focus', function(e) {
			e.currentTarget.blur();
			var _keyboard = getInstanceKeyboardByInputId(sipboxId);
			setConfigKeyboardBeforeDisplay(_keyboard, sipboxId);

			_keyboard.enableCursor(sipboxId + 'Cursor', cursorColor, 500);
		})
		if (assertGridValue(sipboxId)) {
			document.querySelectorAll('.grid-sip').map(function(item, index) {
				item.addEventListener('click', function() {
					var _inputId = getNextEle(item, 'sip').getAttribute('id');
					var _keyboard = getInstanceKeyboardByInputId(_inputId);
					setConfigKeyboardBeforeDisplay(_keyboard, _inputId);
				})
			})
		}
		document.querySelectorAll('input, textarea, .grid-sip input').map(function (item, index) {
			item.addEventListener('touchstart', function (e) {
				hideAllKeyBoard(e);
			})
			item.addEventListener('click', function (e) {
				hideAllKeyBoard(e);
			})
		})
	}
	
	function getNextEle(el, filter) {
		var next = el.nextSibling;
		while (next) {
			if (next.classList.contains(filter)) {
				return next;
			} else {
				next = next.nextSibling;
			}
		}
		return null;
	}

	function setServerRandom(ins, inputId) {
		//设置后端返回的随机码（干嘛用的？）
		var serverRandom = ins.serverRandom || document.querySelector('#serverRandom').value;
		if (serverRandom) {
			ins.setServerRandom(serverRandom, inputId);
		}
	}

	function hideAllKeyBoard(e) {
		var fieldId = e.target.getAttribute('id');
		for (var i of Object.keys(keyBoardmapping)) {
			var item = keyBoardmapping[i];
			var key = item.b;
			if (fieldId !== key) {
				item.hideKeyboard();
			}
		}
	}

	//更新网格控件显示的值
	function updateGridValue(element, isEncryptState) {
		var boxIDs = ['box0', 'box1', 'box2', 'box3', 'box4', 'box5'];
		if (isEncryptState || (isEncryptState == undefined)) {
			for (var i = 0; i < 6; i++) {
				var currentBox = document.getElementById(boxIDs[i]);
				if (i < element.value.length) {
					currentBox.innerHTML = '•';
				} else {
					currentBox.innerHTML = '';
				}
			}
		} else {
			for (var i = 0; i < 6; i++) {
				var currentBox = document.getElementById(boxIDs[i]);
				if (i < element.value.length) {
					currentBox.innerHTML = element.value.charAt(i);
				} else {
					currentBox.innerHTML = '';
				}
			}
		}
	}

	//获取加密结果
	function getEncrypt(sipboxId) {
		var keyboard = getInstanceKeyboardByInputId(sipboxId);
		// return keyboard.getEncryptedInputValue(sipboxId);
		// var resultTextarea = document.getElementById('encryptedResult');
		// resultTextarea.value = '';
		var encryptedInputValue = keyboard.getEncryptedInputValue(sipboxId);
		var errorCode = keyboard.getErrorCode(sipboxId).toString(16);
		// console.log(encryptedInputValue,errorCode)
		// if (errorCode != CFCA_OK) {
		//     resultTextarea.value += '加密输入数据错误: 0x' + errorCode + '\n';
		//     return;
		// } else {
		//     resultTextarea.value += '加密输入数据: ' + encryptedInputValue + '\n';
		// }
		var encryptedClientRandom = keyboard.getEncryptedClientRandom(sipboxId);
		errorCode = keyboard.getErrorCode(sipboxId).toString(16);
		// console.log('11', encryptedClientRandom, errorCode)
		// if (errorCode != CFCA_OK) {
		//     resultTextarea.value += '加密客户端随机数错误: 0x' + errorCode + '\n';
		//     return;
		// } else {
		//     resultTextarea.value += '加密客户端随机数: ' + encryptedClientRandom + '\n';
		// }
		// var passwordStrengthLevel = keyboard.getCipherAttributes(sipboxId);
		// resultTextarea.value += '弱密码判断:';
		// resultTextarea.value += '小写字母:' + passwordStrengthLevel[0];
		// resultTextarea.value += '大写字母:' + passwordStrengthLevel[1];
		// resultTextarea.value += '数字:' + passwordStrengthLevel[2];
		// resultTextarea.value += '符号:' + passwordStrengthLevel[3];
		// resultTextarea.value += '是否完全连续:' + passwordStrengthLevel[4];
		// resultTextarea.value += '是否完全重复:' + passwordStrengthLevel[5];
		// resultTextarea.value += '连续字符个数:' + passwordStrengthLevel[6];
		// resultTextarea.value += '重复字符个数:' + passwordStrengthLevel[7];
		return {
			'encryptedInputValue': encryptedInputValue,
			'encryptedClientRandom': encryptedClientRandom
		};
	}

	function getAllEncrypt() {
		var ids = Object.keys(keyBoardmapping);
		var params = {};
		ids.forEach(function(item, index) {
			var _k = getEncrypt(item);
			params[item] = _k['encryptedInputValue'];
			params[item + '_eRc'] = _k['encryptedClientRandom'];
		})
		return JSON.stringify(params);
	}

	//检测两次输入是否一致
	function checkEqual(sipboxId1, sipboxId2) {
		var _keyboard1 = getInstanceKeyboardByInputId(sipboxId1);
		// console.log('check match start')
		// console.log(_keyboard1.checkInputValueMatch(sipboxId1, sipboxId2))
		// console.log(CFCAKeyboard.prototype.checkInputValueMatch(sipboxId1, sipboxId2))
		// return _keyboard1.checkInputValueMatch(sipboxId1, sipboxId2);
		// return CFCAKeyboard.prototype.checkInputValueMatch(sipboxId1, sipboxId2);
		return _keyboard1.checkInputValueMatch(sipboxId1, sipboxId2);
	}

	function bindCheckKeyBoard(sipboxId1, sipboxId2) {
		var _keyboard1 = getInstanceKeyboardByInputId(sipboxId1);
		_keyboard1.bindInputBox(sipboxId2);
	}
	_keyboard.getAllEncrypt = getAllEncrypt;
	return _keyboard;
});
