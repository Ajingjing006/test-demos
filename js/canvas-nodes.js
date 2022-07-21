;(()=>{
	let h = screen.availHeight;
	let w = screen.availWidth;
	let p1 = 60;//连线距离
	let n = 4;//引力下速度修正系数
	let p2 = p1 * n + 4;//鼠标小球作用力范围
	let p3 = 2;//引力画线界限修订
	const LINE = 10;
	let speed = 0.5;
	let nodes = [];
	let mousePoint = void '';
	var canvas = document.createElement('canvas');
	document.querySelector('body').appendChild(canvas);
	initListeners();
	let ctx = canvas.getContext('2d');
	canvas.setAttribute('style', 'position: fixed;top: 0;left: 0;');
	setCanvasRec();
	createNodes(160);
	
	setInterval(draw, 12);
	
	function draw() {
		ctx.clearRect(0, 0, w, h);
		nodes.map(nodeNextPosition);
		nodes.forEach((item, index)=>{
			paintNode(item);
			item.line = 0;
			paintLines(item, mousePoint);
			for(let i=index+1;i<nodes.length;i++) {
				paintLines(item, nodes[i]);
			}
		})
	}
	
	function nodeNextPosition(node) {
		node.x = node.x + node.s2;
		node.y = node.y + node.s1;
		if (node.x < 0) {
			node.x = 0;
			node.s2 = node.s2 * -1;
		}
		if (node.x > w) {
			node.x = w;
			node.s2 = node.s2 * -1;
		}
		if (node.y < 0) {
			node.y = 0;
			node.s1 = node.s1 * -1;
		}
		if (node.y > h) {
			node.y = h;
			node.s1 = node.s1 * -1;
		}
		mousePointerEffect(node);
	}
	
	function mousePointerEffect(node) {
		if (mousePoint) {
			let pp = (node.x - mousePoint.x) ** 2 + (node.y - mousePoint.y) ** 2;
			if (pp < p2 ** 2 && pp > (p1 - p3) ** 2) {
				_angle = Math.atan((node.y - mousePoint.y)/(node.x - mousePoint.x));
				if (node.y < mousePoint.y && node.x < mousePoint.x) {
					_angle = _angle + Math.PI;
				}
				if (node.y > mousePoint.y && node.x < mousePoint.x) {
					_angle = _angle + Math.PI * 0.5;
				}
				if (node.y < mousePoint.y && node.x > mousePoint.x) {
					_angle = _angle - Math.PI * 0.5;
				}
				node.angle = (node.angle + _angle);
				let e1 = Math.pow(pp/(p1 ** 2), 0.3);
				node.s1 = speed * Math.sin(node.angle) * e1;
				node.s2 = speed * Math.cos(node.angle) * e1;
				let f1 = 1;
				if (mousePoint.x < node.x) {
					f1 = -1;
				}
				node.x = node.x + Math.abs(node.s2) * f1 * n;
				let f2 = 1;
				if (mousePoint.y < node.y) {
					f2 = -1;
				}
				node.y = node.y + Math.abs(node.s1) * f2 * n;
			}
		}
	}
	
	function paintNode(node) {
		ctx.beginPath();
		ctx.arc(node.x, node.y, 1, 0, 2 * Math.PI);
		ctx.fillStyle = '#666';
		ctx.fill();
	}
	
	function paintLines(n1, n2) {
		if (n1 && n2) {
			let _p1 = p1;
			if (n2 == mousePoint) {
				_p1 = _p1 * n;
			}
			if (n2 != mousePoint && (n1.line > LINE || n2.line > LINE)) {
				return;
			}
			if ((n1.x - n2.x) ** 2 + (n1.y - n2.y) ** 2 < (_p1 ** 2)) {
				n1.line++;
				n2.line++;
				ctx.beginPath();
				ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
				ctx.moveTo(n1.x, n1.y);
				ctx.lineTo(n2.x, n2.y);
				ctx.lineWidth = '1px';
				ctx.stroke();
			}
		}
	}
	
	function initListeners() {
		canvas.addEventListener('mouseover', (e)=>{
			mousePoint = {
				x: e.clientX,
				y: e.clientY
			}
		})
		canvas.addEventListener('mousemove', (e)=>{
			mousePoint = {
				x: e.clientX,
				y: e.clientY
			}
		})
		canvas.addEventListener('mouseleave', (e)=>{
			mousePoint = {
				x: w * 0.5,
				y: h * 0.5
			}
		})
	}
	
	function createNodes(n) {
		while(n--) {
			nodes.push(createNode())
		}
	}
	
	function setCanvasRec() {
		canvas.width = w;
		canvas.height = h;
	}
	
	function createNode() {
		let angle = Math.random() * 2 * Math.PI; 
		return {
			x: Math.random() * w,
			y: Math.random() * h,
			s1: speed * Math.sin(angle),
			s2: speed * Math.cos(angle),
			angle,
			line: 0
		}
	}
})()