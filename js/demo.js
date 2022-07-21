setTimeout(function() {
	init();
}, 1000)
/*
 *
 * 关于其他非当前环境的一些旧的页面的使用方法，cfcasipKeyboard 是全局对象，等同于这里的keyboard
 * 使用时把keyboard 换为 cfcasipKeyboard即可
 * 编译代码时，使用的地址应为网络地址
 * https://creditcard.bankcomm.com/content/dam/phone/common-keyboard/cfcasip.min.transform.js
 * https://creditcard.bankcomm.com/content/dam/phone/common-keyboard/keyboard.css
 */

//参数使用方式看第一个例子,输入框显示样式看pug结构(1 input样式｜ 2 分割成多个矩形输入框)
function init() {
	var cfcasip = cfcasipKeyboard;
	var keyboard1 = cfcasip.initIdentityKeyboard({
		//cfcasipKeyboard（全局的值） 和 keyboard（模块内部的值） 等价
		elID: "SIPBox1",
		type: cfcasip.TYPE.KEYBOARD_TYPE_COMPLETE, //KEYBOARD_TYPE_COMPLETE(全键盘) | KEYBOARD_TYPE_IDENTITY(身份证键盘) | KEYBOARD_TYPE_NUMBER(数字电话键盘)| KEYBOARD_TYPE_NUMBER(含小数点数字键盘)
		serverRandom: "MTIzNDU2Nzg5MDk4NzY1NA==", //后端传入的参数，使用时保证服务端的生成字符串能正常输入
		maxLength: 14, //设置输入的最大长度，设置后无法超出输入，默认值8
		minLength: 6, //最小输入长度，默认值6。当输入的长度没有达到设置的长度时，getEncrypt方法中的值会是空的字符串。
		doneCallBack: function() {
			//输入结束的回调方法，可不写
			console.log("hello 结束", keyboard1.getEncrypt("SIPBox1"));
		},
		cursorColor: "#f00" // 设置光标颜色
	});

	var keyboard12 = cfcasip.initIdentityKeyboard({
		//cfcasipKeyboard（全局的值） 和 keyboard（模块内部的值） 等价
		elID: "SIPBox12",
		type: cfcasip.TYPE.KEYBOARD_TYPE_COMPLETE, //全键盘
		serverRandom: "MTIzNDU2Nzg5MDk4NzY1NA=="
	});
	//当对两个密码框内容是否相同进行比较时，请提前使用以下方法对两个比较的id进行预先绑定 *important 注意顺序，先创建两个键盘 1，2。然后建立 1 ，2 的比较关系
	// keyboard.bindCheckKeyBoard('SIPBox1', 'SIPBox12');
	cfcasip.bindCheckKeyBoard("SIPBox1", "SIPBox12");

	/*
	 *
	 * 关于样式
	 * 可能存在问题的光标，需要自行根据不同的场景进行对应的调整，
	 * .sipbox-sip .cursor 这是光标的类名
	 *
	 */

	var keyboard2 = cfcasip.initIdentityKeyboard({
		elID: "SIPBox2",
		type: cfcasip.TYPE.KEYBOARD_TYPE_IDENTITY, //身份证键盘
		serverRandom: "MTIzNDU2Nzg5MDk4NzY1NA==",
		maxLength: 18
	});
	var keyboard3 = cfcasip.initIdentityKeyboard({
		elID: "SIPBox3",
		type: cfcasip.TYPE.KEYBOARD_TYPE_NUMBER, //数字话键盘
		serverRandom: "MTIzNDU2Nzg5MDk4NzY1NA=="
	});
	var keyboard4 = cfcasip.initIdentityKeyboard({
		elID: "SIPBox4",
		type: cfcasip.TYPE.KEYBOARD_TYPE_NUMBER_DECIMAL, //含小数点数字键盘
		serverRandom: "MTIzNDU2Nzg5MDk4NzY1NA=="
	});

	var keyboard5 = cfcasip.initIdentityKeyboard({
		elID: "SIPBox5",
		type: cfcasip.TYPE.KEYBOARD_TYPE_NUMBER,
		serverRandom: "MTIzNDU2Nzg5MDk4NzY1NA=="
	});
	var keyboard6 = cfcasip.initIdentityKeyboard({
		elID: "SIPBox6",
		type: cfcasip.TYPE.KEYBOARD_TYPE_NUMBER,
		serverRandom: "MTIzNDU2Nzg5MDk4NzY1NA=="
	});

	document.querySelector("body").addEventListener("click", function(e) {
		var el = e.target;
		if (el.classList && el.classList.contains("clear-btn")) {
			var btn = el;
			var id = btn.getAttribute("id");
			switch (id) {
				case "cleart-btn0":
					btn
						.closest(".input-box")
						.find("input")
						.focus()
						.val("");
					break;
				case "cleart-btn1":
					keyboard1.clearAll("SIPBox1");
					break;
				case "cleart-btn12":
					keyboard12.clearAll("SIPBox12");
					break;
				case "cleart-btn2":
					keyboard2.clearAll("SIPBox2");
					break;
				case "cleart-btn3":
					keyboard3.clearAll("SIPBox3");
					break;
				case "cleart-btn4":
					keyboard4.clearAll("SIPBox4");
					break;
				case "cleart-btn5":
					keyboard5.clearAll("SIPBox5");
					break;
				case "cleart-btn6":
					keyboard6.clearAll("SIPBox6");
					break;
			}
			btn.style.display = "none";
		}
	});

	document.querySelector("body").addEventListener("click", function(e) {
		var ele = e.target;
		if (ele == check || ele.closest("#check")) {
			if (!SIPBox1.value.length || !SIPBox12.value.length) {
				console.log("输入框不能为空（请输入密码）");
			} else {
				console.log(keyboard1.checkEqual("SIPBox1", "SIPBox12"));
			}
		}
	});
	document
		.querySelectorAll(".input-box input")
		.forEach(function(item, index) {
			item.addEventListener("input", function(e) {
				var el = e.currentTarget;
				clearBtnState(el, el.value);
			});
		});
	document
		.querySelectorAll(".input-box input")
		.forEach(function(item, index) {
			item.addEventListener("click", function(e) {
				document
					.querySelectorAll(".clear-btn")
					.forEach(function(item, index) {
						item.style.display = "none";
					});
				var el = e.currentTarget;
				clearBtnState(el, el.value);
			});
		});

	document
		.querySelectorAll(".sipbox-sip .sip")
		.forEach(function(item, index) {
			item.addEventListener("valueChange", function(e) {
				var $this = e.currentTarget;
				clearBtnState($this, e.data);
			});
		});

	function clearBtnState(ele, value) {
		var $clearBtn = [];
		var cont = ele.closest(".input-box");
		document.querySelectorAll(".clear-btn").forEach(function(item, index) {
			if (item.closest(".input-box") === cont) {
				$clearBtn.push(item);
			}
		});
		if (value && value.length) {
			$clearBtn && $clearBtn[0] ?
				($clearBtn[0].style.display = "block") :
				"";
		} else {
			$clearBtn && $clearBtn[0] ?
				($clearBtn[0].style.display = "none") :
				"";
		}
	}

	getvalue.addEventListener("click", function() {
		alert(
			"encryptedInputValue: " +
			keyboard6.getEncrypt("SIPBox6").encryptedInputValue +
			"/n" +
			"encryptedClientRandom: " +
			keyboard6.getEncrypt("SIPBox6").encryptedClientRandom
		);
		console.log(keyboard6.getEncrypt("SIPBox6"));
	});
	getAllvalue.addEventListener("click", function() {
		var s = cfcasip.getAllEncrypt();
		console.log(s);
		alert(s);
	});
}
