function donateClick() {
	chrome.tabs.create({url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7BDUJ9WFCEPLG'});
}
function init() {
	document.getElementById('donate-link').addEventListener("click",donateClick,false);
}

document.addEventListener("DOMContentLoaded", init, false);