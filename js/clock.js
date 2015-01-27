function getTime() {
	var curTime = document.getElementById("clock");
	curTime.innerHTML = new Date().toLocaleTimeString();
	setTimeout(getTime, 1000);
}

getTime();