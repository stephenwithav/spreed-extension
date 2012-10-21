var splitText;
var wpm;
var chunkSize;

var wordDiv;
var wpmDiv;
var chunkSizeDiv;
var wordIndex;

var pauseButton;
var playButton;

var wordTimer;

function init() {
	//alert(localStorage.getItem("selectedText"));
	//tokenize selected text (make sure there's stuff in it too)
	var selectedText = localStorage.getItem("selectedText");
	if (!isEmpty(selectedText)) {
		splitText = selectedText.split(" ");
		//set first word
		wordIndex = 0;
		wordDiv = document.getElementById('word');
		wordDiv.innerHTML = splitText[wordIndex];

		wpm = 300;
		wpmDiv = document.getElementById('wpm');
		wpmDiv.innerHTML = wpm+" wpm";

		chunkSize = 1;
		chunkSizeDiv = document.getElementById('chunkSize');
		chunkSizeDiv.innerHTML = chunkSize+" words at a time";

		delay = 1/(wpm/60)*1000;
		pauseButton = document.getElementById('pause');
		pauseButton.disabled = true;
		
		//add play button listener		
		playButton = document.getElementById('play');
		playButton.addEventListener("click", play, false);
		pauseButton.addEventListener("click", pause, false);
	}
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function play() {
	//alert("play");
	wordTimer = setInterval(function(){nextWord()},delay);
	//disable play, enable pause
	playButton.disabled=true;
	pauseButton.disabled=false;
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
}

function pause() {
	clearInterval(wordTimer);
	playButton.disabled=false;
	pauseButton.disabled=true;
}

document.addEventListener("DOMContentLoaded", init, false);


