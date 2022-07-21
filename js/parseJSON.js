(function (w) {
	$.handlebars({
		templatePath: 'tpl',
		templateExtension: 'tpl'
	});
	$.ajax({
		url: 'resource/data.json',
		type: 'GET',
		datatype: 'JSON',
		success: function (response) {
			createDOM(response);
			var t = setTimeout(function () {
				createLines();//此处调用的是主页面的方法
				clearTimeout(t);
				t = null;
			}, 100);
		},
		error: function (e) {
			
		}
	});
	
	function createDOM(data) {
		var list = getHomeEntries(data.moduleData[0].modules);
		//var html = Handlebars.compile('tpl/main.tpl', list);
		//console.log(groupBy(list, 'mType'))
		$('.main-content').render('main', {list});
	}
	
	function getHomeEntries(pagesDataList) {
		for (var i=0,len=pagesDataList.length;i<len;i++) {
			var item = pagesDataList[i];
			if (item.name === '首页') {
				return item.modules;//首页全部的第一层（行）数据列表
			}
		}
		return null;
	}
})(window);