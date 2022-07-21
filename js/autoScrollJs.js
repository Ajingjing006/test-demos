(function(w) {
	var document = w.document;
	var keyboardHeight = 300;//键盘默认高度
	var spacerEle = 'scrollSpacer' + Math.floor(Math.random() * 100);
	var _mapping = {};
	function register(ele, scrollCont) {
		scrollCont = scrollCont || 'html';
		_mapping[ele] = scrollCont;
		tryAddSpacerDiv();
		$('body').on('focus', ele, function (e) {
			if(e.currentTarget.tagName.toLowerCase() === 'input') {
				var scrollH = calcSpacerHeight(e.currentTarget);
				if (scrollH > 0) {
					doScroll(scrollH, ele);
				}
			}
		}).on('blur', ele, function (e) {
			if(e.currentTarget.tagName.toLowerCase() === 'input') {
				doScrollBack(ele);
			}
		})
	}
	
	function tryAddSpacerDiv() {
		if ($('.' + spacerEle).length <= 0) {
			$('body').append($('<div class="' + spacerEle + '"></div>'));
		}
	}
	
	function calcSpacerHeight(ele) {
		var pageScrollTop = $('html').scrollTop() || $('body').scrollTop();
		var eleOffsetTop = $(ele).offset().top;
		var eleHeight = $(ele).outerHeight();
		var screenHeight = window.screen.availHeight;
		var bottom = pageScrollTop + screenHeight - eleOffsetTop - eleHeight;
		if (bottom < 0) {
			bottom = 0;
		}
		var result = keyboardHeight - bottom;
		return result;
	}
	
	function doScroll(scrollH, currentEle) {
		var cont = $(currentEle).closest(_mapping[currentEle]);
		var contDisplay = cont.css('position').toLowerCase();
		if (contDisplay === 'fixed' || contDisplay === 'absolute') {
			var availableV = + $(cont).css('bottom').split('px')[0] || 0;
			$(cont).animate({bottom: availableV + scrollH + 'px'});
			localStorage.setItem('scrollFix_Backup', JSON.stringify({
				type: 1,
				backup: availableV
			}))
		} else {
			var availableV = Math.max($('html').scrollTop(), $('body').scrollTop());
			$('.' + spacerEle).css('height', scrollH);
			$('html, body').animate({scrollTop: availableV + scrollH + 'px'});
			localStorage.setItem('scrollFix_Backup', JSON.stringify({
				type: 0,
				backup: availableV
			}));
		}
	}
	
	function doScrollBack(ele) {
		var option = JSON.parse(localStorage.getItem('scrollFix_Backup'));
		if (option.type == 1) {
			$(_mapping[ele]).animate({bottom: option.backup + 'px'});
		} else {
			$('html, body').animate({scrollTop: option.backup + 'px'});
			setTimeout(function() {
				$('.' + spacerEle).css('height', '0');
			}, 300);
		}
	}
	
	w.AutoScrollJS = {
		register: register
	}
})(window)