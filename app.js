var splitText;
var wpm;
var chunkSize;

var wordDiv;
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
		chunkSize = 1;
		delay = 1/(wpm/60)*1000;
		pauseButton = document.getElementById('pause');
		pauseButton.disabled = true;
		
		//add play button listener		
		playButton = document.getElementById('play');
		playButton.addEventListener("click", play, false);
	}
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function play() {
	//alert("play");
	wordTimer = setInterval(function(){nextWord()},delay);
}
function nextWord() {
	wordIndex = wordIndex+1;

	wordDiv.innerHTML = splitText[wordIndex];
}

function pause() {

}

document.addEventListener("DOMContentLoaded", init, false);


