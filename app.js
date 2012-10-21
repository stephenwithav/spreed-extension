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

function groupWords(splitText, chunkSize) {
	var newSplitText=new Array();
	chunkCount=0;
	for (var i=0; i<splitText.length; i=i+chunkSize) {
		var newChunk="";
		for (var j=0; j<chunkSize; j++) {
			newChunk = newChunk + splitText[i+j] + " ";
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

		wpm = 300;
		wpmDiv = document.getElementById('wpm');
		wpmDiv.innerHTML = "WPM: "+wpm;

		chunkSize = 1;
		chunkSizeDiv = document.getElementById('chunkSize');
		chunkSizeDiv.innerHTML = "Words at a time: "+chunkSize;

		//set first word
		wordIndex = 0;

		//group words depending on chunk size
		splitText = groupWords(splitText,chunkSize)

		wordDiv = document.getElementById('word');
		wordDiv.innerHTML = splitText[wordIndex];

		
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


