(function (w) {
	var document = w.document;
	var svgCont;
	var colors = ['#000', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
	var color_index = 0;
	function Line(start, end, animation) {
		animation = animation || 'animation';
		this.start = start;
		this.end = end;
		this.lineSVGEle = this.create(start, end, animation);
		return this;
	}
	
	Line.prototype.create = function(start, end) {
		//创建svg线
		function getSVGLineElement(rect1, rect2) {
			var data = getLineEndPointsBaseRectangles(rect1, rect2);
			var svgContData = getViewBoxData(rect1, rect2);
			var attributes = {
				width: svgContData.w,
				height: svgContData.h,
				xmlns: Line._svgNS,
				viewBox: svgContData.viewBox,
				style: 'stroke-dashoffset:' + (rect1.x > rect2.x? '-100%': '100%'),
				x: '0px',
				y: '0px'
			};
			var svg = document.createElementNS(Line._svgNS, 'svg');
			for (var i in attributes) {
				svg.setAttribute(i, attributes[i]);
			}
		
			var path = document.createElementNS(Line._svgNS, 'path');
			var pathAttributes = {
				d: getPathData(data),
				fill: Line.LINE_OPTION.FILL,
				stroke: getLineColor(),
				'stroke-width': Line.LINE_OPTION.WEIGHT
			}
			for (var i in pathAttributes) {
				path.setAttribute(i, pathAttributes[i]);
			}
			svg.appendChild(path);
			return svg;
		}
		
		function getLineColor() {
			return colors[color_index++] || colors[color_index=0];
		}
		
		//根据传入的两个节点选择,创建连线
		function createLineInCont(el1, el2) {
			var start = getNodeEle(el1);
			var end = getNodeEle(el2);
			if (start && !includeClass(start.className, 'hide')
				&& end && !includeClass(end.className, 'hide')) {
				var svg = getSVGLineElement(getNodeRectangle(start), getNodeRectangle(end));
				getLineCont().appendChild(svg);
				svg.setAttribute('start', el1);
				svg.setAttribute('end', el2);
				return svg;
			}
			return null;
		}
		
		function getLineCont() {
			if (!svgCont) {
				svgCont = document.createElement('div');
				getNodeEle('body').appendChild(svgCont);
			}
			return svgCont;
		}
		
		return createLineInCont(start, end);
	}
	Line.prototype.refresh = function() {
		this.lineSVGEle;
		//更新画线，需要先获取真正的两个端点元素
		var startNode = getNodeEle(this.start);
		var endNode = getNodeEle(this.end);
		if (startNode && endNode && this.lineSVGEle) {
			//基于这两个端点，获取新的画布大小，新的path路径
			var startRec = getNodeRectangle(startNode);
			var endRec = getNodeRectangle(endNode);
			var data = getLineEndPointsBaseRectangles(startRec, endRec);
			
			//将获得的新数据更新到svg元素上
			var svgContData = getViewBoxData(startRec, endRec);
			this.lineSVGEle.setAttribute('width', svgContData.w);
			this.lineSVGEle.setAttribute('height', svgContData.h);
			this.lineSVGEle.setAttribute('viewBox', svgContData.viewBox);
			
			var pathArr = this.lineSVGEle.getElementsByTagName('path');
			if (pathArr && pathArr.length > 0) {
				pathArr[0].setAttribute('d', getPathData(data));
			}
		}
	}
	Line.SVG_CONT_ID = '#svg-cont';
	
	Line.LINE_OPTION = {
		WEIGHT: 2,
		FILL: 'transparent'
	}
	
	Line.POINT_OPTION = {
		FIX: '50',//default
		FIX_START: '10',
		FIX_END: '50'
	}
	
	Line._svgNS = 'http://www.w3.org/2000/svg';
	
	//查找获取节点
	function getNodeEle(el) {
		return document.querySelector(el);
	}
	
	//获取节点的坐标,宽高
	function getNodeRectangle(node) {
		if (node) {
			var rec = node.getClientRects()[0];
			var x = node.offsetLeft;
			var y = node.offsetTop;
			var w = node.offsetWidth;
			var h = node.offsetHeight;
			return {
				x: rec.x,
				y: rec.y,
				w: rec.width,
				h: rec.height
			}
		} else {
			return null;
		}
	}
	
	//根据传入的两个需要连接的矩形区域的信息，获得需要画线的两个端点
	function getLineEndPointsBaseRectangles(rect1, rect2) {
		//暂不考虑两个矩形区域直接相邻或重叠这种情况
		var point1, point2;
		var p1, p2;
		p1 = rect1.x < rect2.x ? rect1 : rect2;
		p2 = rect1.x < rect2.x ? rect2 : rect1;
		point1 = {
			x: p1.x + p1.w,
			y: p1.y + p1.h * 0.5
		}
		point2 = {
			x: p2.x,
			y: p2.y + p2.h * 0.5
		}
		return {
			point1,
			point2
		};
	}
	
	//获取最大的显示画布区域
	function getViewBoxData(rect1, rect2) {
		var w = (rect2.x > rect1.x ? (rect2.x + rect2.w) : (rect1.x + rect1.w));
		var h = rect2.y + rect2.h;
		if(h < rect1.y + rect1.h) {
			h = rect1.y + rect1.h;
		};
		return {
			viewBox: '0 0 ' + w + ' ' + h,
			w: w,
			h: h
		};
	}
	
	//根据传入的端点数据,获得需要连线的path值
	function getPathData(data) {
		var {
			point1,
			point2
		} = data;
		return `M ${point1.x} ${point1.y} H ${parseFloat(point1.x) + parseFloat(Line.POINT_OPTION.FIX_START)} L ${parseFloat(point2.x) - parseFloat(Line.POINT_OPTION.FIX_END)} ${point2.y} H ${point2.x}`;
	}
	
	function includeClass(arrStr, val) {
		var i = 0;
		var arr = arrStr.split(' ');
		if (arr && val) {
			while(arr[i]) {
				if (arr[i] == val) {
					return true;
				}
				i++;
			}
		}
		return false;
	}
	w.Line = Line;
})(window);