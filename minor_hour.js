function minorHour(hour){
	const numeral = {
		1: "First",
		3: "Third",
		6: "Sixth",
		9: "Ninth"
	}
	var numOhHour = hour.charAt(0);
	// TODO: enging of Our Father is missing
	document.getElementById("text-container").innerHTML = `<h2>The ${numeral[numOhHour]} hour</h2>
	${usualBeginning}<br>
	<div id="psalms"></div><br>
	${tripleAlleluia}<br>
	<div id="troparia"></div>
	${andNow}
	<div id="theotokion"></div>
	<div id="chapter"></div>
	${trisagionToPater}<br>
	<div id="kontakia"></div>
	Lord, have mercy. <FONT COLOR="RED">(40)</FONT><br>
	${prayerOfTheHours}
	<div id="prayer"></div>
	`;
	setPriest();
	loadText();
}

function loadText() {
	var selectedVersion = document.querySelector('input[name="option"]:checked');
	if (!selectedVersion) {
            console.error("No version selected.");
            return;
        }
	var filename = `horologion\\` + document.querySelector('input[name="hour"]:checked').value + `.json`;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("text-container").style.display = "block";
			var jsonData = JSON.parse(this.responseText);
			if (selectedVersion.value === "1") {
				var values = Object.values([jsonData["1"], jsonData["2"], jsonData["3"]]);
				var formattedValues = values.map(item => `<div class="subhead">${item.head}</div>${item.text}`).join("<br>");
				document.getElementById("psalms").innerHTML = formattedValues;
			} else if (selectedVersion.value === "2") {
				var dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
				var value;
				if (dayOfWeek === 1 || dayOfWeek === 4) {
					value = jsonData["1"];
				} else if (dayOfWeek === 2 || dayOfWeek === 5) {
					value = jsonData["2"];
				} else if (dayOfWeek === 3 || dayOfWeek === 6) {
					value = jsonData["3"];
				} else {
					throw new Error("No data available for the selected day.");
				}
				document.getElementById("psalms").innerHTML = `<div class="subhead">${value.head}</div>${value.text}`;
			}
			document.getElementById("troparia").innerHTML = jsonData["lenten_troparia"]
			document.getElementById("theotokion").innerHTML = jsonData["theotokion"]
			document.getElementById("chapter").innerHTML = jsonData["chapter"]
			document.getElementById("kontakia").innerHTML = jsonData["lenten_kontakion"]
			document.getElementById("prayer").innerHTML = jsonData["prayer"]
		}
	};
	xhttp.open("GET", filename, true);
	xhttp.send();
}