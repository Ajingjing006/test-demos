(function (w) {
	let listenMap = {};
	const callback = function(mutationsList, observer) {
	    for(let mutation of mutationsList) {
	        if (mutation.type === 'childList') {
	            console.log('A child node has been added or removed.');
	        }
	        else if (mutation.type === 'attributes') {
	            console.log('The ' + mutation.attributeName + ' attribute was modified.');
	        }
	    }
	}
	function getMutation(id) {
		const observer = new MutationObserver(callback);
		if (!listenMap[id]) {
			listenMap[id] = observer;
		}
		return listenMap[id];
	}
	function startListen(id) {
		const targetNode = document.querySelector(id);
		const config = { attributes: true, childList: true, subtree: true };
		getMutation(id).observe(targetNode, config);
	}
	function stopListen(id) {
		getMutation(id).disconnect();
	}
	function log(args) {
		console.log(...args);
	}
	w.startListenText = startListen;
	w.stopListenText = stopListen;
})(window)