
function setDefaultHour() {
	var currentTime = new Date().getHours();
	var DefaultHour;
	if (currentTime < 3 | currentTime >= 21){
		DefaultHour = document.getElementById('midnight');
	} else if (currentTime < 6) {
		DefaultHour = document.getElementById('matins');
	} else if (currentTime < 8) {
		DefaultHour = document.getElementById('hour-1');
	} else if (currentTime < 11) {
		DefaultHour = document.getElementById('hour-3');
	} else if (currentTime < 14) {
		DefaultHour = document.getElementById('hour-6');
	} else if (currentTime < 17) {
		DefaultHour = document.getElementById('hour-9');
	} else {
		DefaultHour = document.getElementById('compline');
	}
	DefaultHour.checked = true;
	selectHour();
}

function selectHour() {
	var hour = document.querySelector('input[name="hour"]:checked').value;
	var selectedVersion = document.querySelector('input[name="option"]:checked');
	if (hour === "1hour" || hour === "3hour" || hour === "6hour" || hour === "9hour") {
		minorHour(hour);
	} else {
		compline();
	}
}

function setPriest() {
	var priest = document.querySelector('input[name="priest"]:checked').value;
	if (priest == "present") {
		beginning = `<FONT COLOR="RED">Priest:</FONT> <b>Blessed be our God, always, now and for ever and ever.</b><br>`;
		ourFatherEnding = `<FONT COLOR="RED">Priest:</FONT> ${cross} <b>For the kingdom, the power and the glory are Yours, Father, Son, and Holy Spirit, now and for ever and ever.</b><br>`;
	} else {
		var zamolytv = `<FONT COLOR="RED">Chariman:</FONT> Through the prayers of our holy fathers, Lord, Jesus Christ our God, have mercy on us.<br>`;
		beginning = `${zamolytv}`;
		ourFatherEnding = `${zamolytv}`;
	};
	document.getElementById("beginning").innerHTML = beginning;
	document.getElementById("our-father-ending").innerHTML = ourFatherEnding;
}


// Call setDefaultHour when the page loads
window.onload = setDefaultHour;