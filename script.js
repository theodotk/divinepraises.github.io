
function setDefaultHour() {
	var currentDate = new Date();
	var currentTime = currentDate.getHours();
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
	[season, week, glas] = parseDate(currentDate);
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


function calculateEaster(year) {
	// from 1876 Nature from wiki
	var a = year%19;
	var b = Math.floor(year/100);
	var c = year%100;
	var d = Math.floor(b/4);
	var e = b%4;
	var g = Math.floor((8*b + 13)/25);
	var h = (19*a + b - d - g + 15)%30;
	var i = Math.floor(c/4);
	var k = c%4;
	var l = (32 + 2*e + 2*i - h - k) % 7;
	var m = Math.floor((a + 11*h + 19*l)/433);
	var month = Math.floor((h + l - 7*m + 90)/25);
	var date = (h + l - 7*m + 33*month + 19) % 32;
	return [month, date];
}

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utcA - utcB) / _MS_PER_DAY);
}

function parseDate(currentDate) {
	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth();
	var currentDay = currentDate.getDate();
	[thisEasterMonth, thisEasterDay] = calculateEaster(currentYear);
	const thisYearEaster = new Date(`${currentYear}-${thisEasterMonth}-${thisEasterDay}`);
	const diffFromEaster = dateDiffInDays(currentDate, thisYearEaster);
	var glas;
	var season;
	var week;
	if (diffFromEaster == 0) {
		glas = 1;
		season = "EasterDay";
	} else if (diffFromEaster > 0 & diffFromEaster < 7) {
		glas = 1;  // TODO: should depend on the day
		season = "EasterWeek";
		week = 0;
	} else if (diffFromEaster >= 7 & diffFromEaster <= 56) {
		glas = Math.floor(diffFromEaster/7)%8;
		season = "AfterEaster";
		week = glas;
	} else if (diffFromEaster > 56 & diffFromEaster < 365+34) {  
		// TODO: account for post-Union feasts that are in Triodion but after 8 weeks
		glas = Math.floor(diffFromEaster/7)%8;
		season = "";
		week = glas;
	} else {  // TODO: break into cases
		[lastEasterMonth, lastEasterDay] = calculateEaster(currentYear-1);
		const lastYearEaster = new Date(`${currentYear-1}-${lastEasterMonth}-${lastEasterDay}`);
		const diffFromLastEaster = dateDiffInDays(currentDate, lastYearEaster);
		glas = Math.floor(diffFromLastEaster/7)%8;
		if (diffFromEaster > -49) {
			season = "Lent";
			week = 7 + Math.floor(diffFromEaster/7);
		} else if (diffFromEaster >= -70) {
			season = "Forelent";
			week = 10 + Math.floor(diffFromEaster/7);
		} else {
			season = "";
			week = glas;
		}
	}
	if (glas == 0) {
		glas = 8;
	}
	document.getElementById("date-container").innerHTML = `${season}, week ${week}, glas ${glas}`
	return [season, week, glas];
}


// Call setDefaultHour when the page loads
window.onload = setDefaultHour;