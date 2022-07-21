var stateIndex = 0;
var maxState = 5;
function getCurrentState() {
	return stateIndex>maxState?stateIndex=0:stateIndex++;
}
btn1.addEventListener('click', function () {
	var state = getCurrentState();
	console.log('state', state);
	switch (state.toString()) {
		case '0':
			history.pushState({page: 1}, "title 1", "?page=1");
			break;
		case '1':
			history.pushState({page: 2}, "title 2", "?page=2");
			break;
		case '2':
			history.replaceState({page: 3}, "title 3", "?page=3");
			break;
		case '3':
			history.back(); // Logs "location: http://example.com/example.html?page=1, state: {"page":1}"
			break;
		case '4':
			history.back(); // Logs "location: http://example.com/example.html?page=1, state: {"page":1}"
			break;
		case '5':
			history.go(2);  // Logs "location: http://example.com/example.html?page=3, state: {"page":3}
			break;
	}
});

window.addEventListener('popstate', (event) => {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
});

const events = [
  "pagehide", "pageshow",
  "unload", "load"
];

const eventLogger = (event) => {
  switch(event.type) {
    case "pagehide":
    case "pageshow":
      let isPersisted = event.persisted ? "persisted" : "not persisted";
      console.log(`Event: ${event.type} - ${isPersisted}`);
      break;
    case "load":
    case "unload":
      console.log(`Event: ${event.type}`);
      break;
    default:
      console.log(`Event: ${event.type}`);
      break;
  }
};

events.forEach(eventName => {
  window.addEventListener(eventName, eventLogger, false);
});