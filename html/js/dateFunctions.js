function getWebDateFromDB(currentDate) {
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var year = currentDate.getUTCFullYear();
	var index = currentDate.getMonth();
	var month = months[index];
	var day =currentDate.getDate() + 1;
	return day + " " + month + " " + year;
}
function getDBDateFromJSDate(currentDate) {
	if (currentDate == null) return "N/A";
	var year = currentDate.getUTCFullYear();
	var month = currentDate.getUTCMonth() + 1;
	var day = currentDate.getDate();
	return year + "-" + month + "-" + day;
}

function getDateFromString(currentDate) {
	
	var sections = currentDate.split("-");
	var year = parseInt(sections[0]);
	var month = parseInt(sections[1]) - 1;
	var day = parseInt(sections[2]) -1;
	result = new Date(year, month, day);
	return result;
}

function getDateFromDBString(currentDate) {
	var sections = currentDate.split("-");
	var year = parseInt(sections[0]);
	var month = parseInt(sections[1]) - 1;
	var day = parseInt(sections[2]);
	result = new Date(year, month, day);
	return result;
}
function getWebDateFromDBString(currentDate) {
	if (currentDate == null) return "N/A";
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var sections = currentDate.split("-");
	var year = parseInt(sections[0]);
	var monthIndex = parseInt(sections[1]) - 1;
	var month = months[monthIndex];
	var day = parseInt(sections[2]);
	return day + " " + month + " " + year;
}
function getStringDateForToday() {
	var original = new Date();
	var year = original.getFullYear();
	var day = original.getDate();
	var month = original.getMonth() + 1;
	return year + "-" + month + "-" + day;
}

function getShortStringDateForToday() {
	var original = new Date();
	var year = original.getFullYear().substr(2);
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var month = months[original.getMonth()];
	return month + "-" + year;
}

