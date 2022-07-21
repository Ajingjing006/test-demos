import ProgressArc from './canvas_paint_arc.js';

window.addEventListener('pageshow', doDraw);
window.addEventListener('visibilitychange', (e)=>{
	if (document.visibilityState === 'visible') {
		doDraw(e);
	}
});
function doDraw(e) {
	new ProgressArc({
		canvasId: 'canvas',
		r: 100, //默认100，半径
		w: 500, //画布宽，默认500
		h: 500, //画布高，默认500
		startAngle: 180, //起始角度，默认180
		endAngle: 300, //终止角度，必须传
		interval: 16, //帧间隔时间，默认5ms
		duration: 1000, //动画时间，默认2000
		lineWidth: 16, //描边线宽度，默认15
		bgColor: '#dddc', //背景色，默认#cccc
		colors: {
			0: 'red',
			1: 'blue'
		},
		type: 'half', //画半圆或者圆，full｜half。默认full
		precision: 4
	})
}