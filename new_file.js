function fun() {
	console.log(count)
}
fun()
var count = 1;
fun();

// 分割线

var num = 1

function fun1() {
	console.log(this.num)
}

var obj = {
	num: 2,
	fun1: fun1,
	fun2() {
		fun1()
	},
	fun3: () => {
		fun1()
	}
}
fun1();
obj.fun1();
obj.fun2();
obj.fun3();
