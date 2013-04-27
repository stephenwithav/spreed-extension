var splitText;
var wpm;
var chunkSize;
var style;

var wordDiv;
var wpmDiv;
var fontSizeDiv;

var chunkSizeDiv;
var wordIndex;

var pauseButton;
var playButton;
var rewindButton;

var wordTimer;

var width;
var height;

function groupWords(splitText, chunkSize) {
	var newSplitText=new Array();
	chunkCount=0;
	for (var i=0; i<splitText.length; i=i+chunkSize) {
		var newChunk="";
		for (var j=0; j<chunkSize; j++) {
			if (i+j<splitText.length) {
				newChunk = newChunk + splitText[i+j] + " ";

			}
		}
		
		if (newChunk==" ") {
			newChunk = "_";
		}

		newSplitText.push(newChunk);
	}
	return newSplitText;
}

function init() {
	//alert(localStorage.getItem("selectedText"));
	//tokenize selected text (make sure there's stuff in it too)
	var selectedText = localStorage.getItem("selectedText");
	if (!isEmpty(selectedText)) {
		splitText = selectedText.split(" ");

		

		//style
		style = 1; //default: 1
		if (localStorage.getItem("style")>0) {
			style=localStorage.getItem("style");
		}
		style = parseInt(style);
		changeStyle();
		
		//wpm
		wpm = 300;
		if (localStorage.getItem("speed")>0) {
			wpm = localStorage.getItem("speed");
		}
		wpm = parseInt(wpm);
		
		wpmDiv = document.getElementById('wpm');
		wpmDiv.innerHTML = "WPM: "+wpm;
		
		//font size
		fontSize=35; //in pixels
		if (localStorage.getItem("font-size")>0) {
			fontSize = localStorage.getItem("font-size");
		}
		fontSize = parseInt(fontSize);
		//set word font size
		setFontSize($("#word-container"),fontSize);

		fontSizeDiv = document.getElementById('font-size-div')
		fontSizeDiv.innerHTML = "Font size: "+fontSize;


		chunkSize = 1;
		if (localStorage.getItem("chunkSize")>0) {
			chunkSize = localStorage.getItem("chunkSize");
		}
		chunkSize = parseInt(chunkSize);
		chunkSizeDiv = document.getElementById('chunkSize');
		chunkSizeDiv.innerHTML = "Words at a time: "+chunkSize;

		//set first word
		wordIndex = 0;

		//group words depending on chunk size
		splitText = groupWords(splitText,chunkSize)
		//console.log(splitText); //debug

		wordDiv = document.getElementById('word');
		wordDiv.innerHTML = splitText[wordIndex]; 


		//autoResizeWord();

		//$("#word").fitText2($("#word-container"));
		
		
		pauseButton = document.getElementById('pause');
		pauseButton.disabled = true;

		rewindButton = document.getElementById('rewind');
		
		//add play/pause button listeners		
		playButton = document.getElementById('play');
		playButton.addEventListener("click", play, false);
		pauseButton.addEventListener("click", pause, false);
		rewindButton.addEventListener("click", rewind, false);
		
		//add increase/decrease listeners
		document.getElementById('increase_wpm').addEventListener("click",increaseWPM,false);
		document.getElementById('decrease_wpm').addEventListener("click",decreaseWPM,false);
	
		document.getElementById('increase-font-size').addEventListener("click",increaseFontSize,false);
		document.getElementById('decrease-font-size').addEventListener("click",decreaseFontSize,false);
		
		document.getElementById('increase-chunkSize').addEventListener("click",increaseChunkSize,false);
		document.getElementById('decrease-chunkSize').addEventListener("click",decreaseChunkSize,false);
		
		document.getElementById('small-donate-link').addEventListener("click",donateClick,false);

		document.getElementById('invert-colors').addEventListener("click",invertColors,false);

		//update wpm multiplier, depending on word chunk size
		updateWPMMultiplier();

		//assign hotkeys
		$(document).bind('keypress', 'j', bindPlay);
		$(document).bind('keypress', 'l', bindRewind);

			
	}
}


function updateWPMMultiplier() {
	if (chunkSize>1) {
			wpmDiv.innerHTML = "WPM: "+wpm+"&#215; "+chunkSize;
	}
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}
function rewind() {
	pause();
	$(document).unbind('keypress');
	init();
}
function play() {
	delay = 1/(wpm/60)*1000;
	//alert("play");
	wordTimer = setInterval(function(){nextWord()},delay);
	//disable play, enable pause
	playButton.disabled=true;
	$(document).unbind('keypress', bindPlay);

	pauseButton.disabled=false;
	$(document).bind('keypress', 'k', bindPause);

}
function nextWord() {
	wordIndex = wordIndex+1;
	if (wordIndex>=splitText.length) {
		//reset
		clearInterval(wordTimer);
		//enable play, disable pause
		playButton.disabled=false;
		pauseButton.disabled=true;
		wordIndex=-1;
	}
	else {
		wordDiv.innerHTML = splitText[wordIndex];
	}

	//console.log("#container width: "+$("#container").width());
	//console.log("#word-continer width: "+$("#word-container").width());
}

function donateClick() {
	chrome.tabs.create({url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7BDUJ9WFCEPLG'});
}


function pause() {
	clearInterval(wordTimer);
	playButton.disabled=false;
	$(document).bind('keypress', 'j', bindPlay);

	pauseButton.disabled=true;
	$(document).unbind('keypress', bindPause);

}

function increaseWPM() {
	
	if (wpm+50<1000) {
		//console.log("increase");
		wpm = wpm+50;
		wpmDiv.innerHTML = "WPM: "+wpm;
		localStorage.setItem("speed", wpm);
		updateWPMMultiplier();
	}
}

function decreaseWPM() {
	if (wpm-50>0) {
		wpm = wpm-50;
		wpmDiv.innerHTML = "WPM: "+wpm;
		localStorage.setItem("speed", wpm);
		updateWPMMultiplier();
	}
}

function setFontSize(obj, value) {
	obj.css('font-size', value+"px");
}

function increaseFontSize() {
	if (fontSize+5<105) {
		fontSize = fontSize+5;
		fontSizeDiv.innerHTML="Font size: "+fontSize;
		localStorage.setItem("font-size",fontSize);
		setFontSize($("#word-container"),fontSize);
	}
}

function decreaseFontSize() {
	if (fontSize-5>=5) {
		fontSize = fontSize-5;
		fontSizeDiv.innerHTML="Font size: "+fontSize;
		localStorage.setItem("font-size",fontSize);
		setFontSize($("#word-container"),fontSize);
	}
}

function increaseChunkSize() {
	if (chunkSize+1<=6) {
		chunkSize = chunkSize+1;
		chunkSizeDiv.innerHTML="Words at a time: "+chunkSize;
		localStorage.setItem("chunkSize",chunkSize);
		init();
	}
}

function decreaseChunkSize() {
	if (chunkSize-1>=1) {
		chunkSize = chunkSize-1;
		chunkSizeDiv.innerHTML="Words at a time: "+chunkSize;
		localStorage.setItem("chunkSize",chunkSize);
		init();
	}
}
function changeStyle() {
	if (style==2)
		document.getElementById("css-style").href="style2.css";
	else if (style==1)
		document.getElementById("css-style").href="style.css";
}
function invertColors() {
	if (style==2)
		style = 1;
	else if (style==1)
		style = 2;
	//console.log("new style "+style);
	localStorage.setItem("style",style);
	changeStyle();
}

window.onresize = resize;

function resize()
{
 //console.log(window.innerWidth);
 //console.log(window.innerHeight);

 localStorage.setItem("width",window.innerWidth);
 localStorage.setItem("height",window.innerHeight);
}

function bindPlay(k) {
	if (String.fromCharCode(k.keyCode) == 'j') {
		play();
	}
}

function bindPause(k) {
	if (String.fromCharCode(k.keyCode) == 'k') {
		pause();
	}
}
function bindRewind(k) {
	if (String.fromCharCode(k.keyCode) == 'l') {
		rewind();
	}
}

document.addEventListener("DOMContentLoaded", init, false);



