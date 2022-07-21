var activeNode;
$('body').on('mousedown', '.data-node', function (e) {
	activeNode = $(this);
	//$(this).attr('');
	console.log(e);
});
$('body').on('mouseup', function (e) {
	activeNode = null;
});
$('body').on('mousemove', function () {
	if (activeNode) {
		
	}
});

function changeDataNodePostionHandler(node) {
	
}