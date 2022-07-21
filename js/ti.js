function log(...args) {
	console.log(...args);
	typeof logEl === 'undefined' ? setTimeout(() => eLog()) : eLog();

	function eLog() {
		var before = logEl.innerHTML;
		args.forEach((i) => {
			before += i;
		})
		before += '<br>';
		log.innerHTML = before;
	}
}

//题目160
log('题目160');
var list = [1, 2, 3];
var square = square ? square : (num => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(num * num)
		}, 1000)
	})
})

function test() {
	list.forEach((x, y) => {
		setTimeout(async () => {
			var res = await square(x)
			console.log(res)
		}, y * 1000)
	})
}
// test();

//题目159
//实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
// Promise.retry = function(promfn, t = 3) {
// 	t = t < 0 ? 0 : t;
// 	function excute() {
// 		log('t', t);
// 		return new Promise((resolve, reject) => {
// 			t--;
// 			new Promise((_resolve, _reject) => {
// 				promfn(resolve, _reject);
// 			}).catch(() => {
// 				if (t > 0) {
// 					return excute();
// 				} else {
// 					return reject();
// 				}
// 			})
// 		})
// 	}
// 	return excute();
// }

// function testFn(resolve, reject) {
// 	reject();
// }

// Promise.retry(testFn)
// .then((res) => {
// 	log('res', res);
// }).catch((err) => {
// 	log('err', err);
// });


//测试浏览器调度时间
var t = new Date();
var time = 1;
for(let i=0;i<20;i++) {
	setTimeout(()=>{
		let t2 = new Date();
		log(t2.getTime() - t.getTime());
		t = t2;
	}, i + 1);
}