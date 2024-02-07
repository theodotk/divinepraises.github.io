
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
	loadText();
}

// Call setDefaultHour when the page loads
window.onload = setDefaultHour;

function loadText() {
	var selectedVersion = document.querySelector('input[name="option"]:checked');
	if (!selectedVersion) {
            console.error("No version selected.");
            return;
        }
	var filename = document.querySelector('input[name="hour"]:checked').value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("text-container").style.display = "block";
			var jsonData = JSON.parse(this.responseText);
			if (selectedVersion.value === "1") {
				var values = Object.values(jsonData).sort((a, b) => a.head.localeCompare(b.head));
				var formattedValues = values.map(item => `<div class="subhead">${item.head}</div>${item.text}`).join("<br>");
				document.getElementById("psalms").innerHTML = formattedValues;
			} else if (selectedVersion.value === "2") {
				var dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
				var value;
				if (dayOfWeek === 1 || dayOfWeek === 4) {
					value = jsonData["1"];
				} else if (dayOfWeek === 2 || dayOfWeek === 5) {
					value = jsonData["2"];
				} else if (dayOfWeek === 3) {
					value = jsonData["3"];
				} else {
					throw new Error("No data available for the selected day.");
				}
				document.getElementById("psalms").innerHTML = `<div class="subhead">${value.head}</div>${value.text}`;
			}
		}
	};
	xhttp.open("GET", filename, true);
	xhttp.send();
}

function setPriest() {
	var priest = document.querySelector('input[name="priest"]:checked').value;
	var cross = `<FONT COLOR="RED"><b>†</b></FONT>`
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
