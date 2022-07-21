function groupBy(list, reg) {
	var result;
	if (list && list.length && Array.isArray(list)) {
		result = {};
		for (var i of list) {
			var key = i[reg];
			if (!result[key]) {
				result[key] = []
			}
			result[key].push(i);
		}
	}
	return result;
}