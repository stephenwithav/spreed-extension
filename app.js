var splitText;
var wpm;
var chunkSize;

var wordDiv;
var wpmDiv;
var fontSizeDiv;

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
			if (i+j<splitText.length) {
				newChunk = newChunk + splitText[i+j] + " ";
			}
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
		
		//wpm
		wpm = 300;
		if (localStorage.getItem("speed")>0) {
			wpm = localStorage.getItem("speed");
		}
		wpm = parseInt(wpm);
		
		wpmDiv = document.getElementById('wpm');
		wpmDiv.innerHTML = "WPM: "+wpm;
		
		//font size
		fontSize=40; //in pixels
		if (localStorage.getItem("font-size")>0) {
			fontSize = localStorage.getItem("font-size");
		}
		fontSize = parseInt(fontSize);
		//set word font size
		setFontSize($("#word-container"),fontSize);

		fontSizeDiv = document.getElementById('font-size-div')
		fontSizeDiv.innerHTML = "Font size: "+fontSize;


		chunkSize = 1;
		//chunkSizeDiv = document.getElementById('chunkSize');
		//chunkSizeDiv.innerHTML = "Words at a time: "+chunkSize;

		//set first word
		wordIndex = 0;

		//group words depending on chunk size
		splitText = groupWords(splitText,chunkSize)

		wordDiv = document.getElementById('word');
		wordDiv.innerHTML = splitText[wordIndex];


		//autoResizeWord();

		//$("#word").fitText2($("#word-container"));
		
		
		pauseButton = document.getElementById('pause');
		pauseButton.disabled = true;
		
		//add play/pause button listeners		
		playButton = document.getElementById('play');
		playButton.addEventListener("click", play, false);
		pauseButton.addEventListener("click", pause, false);
		
		//add increase/decrease listeners
		document.getElementById('increase_wpm').addEventListener("click",increaseWPM,false);
		document.getElementById('decrease_wpm').addEventListener("click",decreaseWPM,false);
	
		document.getElementById('increase-font-size').addEventListener("click",increaseFontSize,false);
		document.getElementById('decrease-font-size').addEventListener("click",decreaseFontSize,false);
		
	}
}



function isEmpty(str) {
    return (!str || 0 === str.length);
}

function play() {
	delay = 1/(wpm/60)*1000;
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

	//console.log("#container width: "+$("#container").width());
	//console.log("#word-continer width: "+$("#word-container").width());
}

function pause() {
	clearInterval(wordTimer);
	playButton.disabled=false;
	pauseButton.disabled=true;
}

function increaseWPM() {
	
	if (wpm+50<1000) {
		console.log("increase");
		wpm = wpm+50;
		wpmDiv.innerHTML = "WPM: "+wpm;
		localStorage.setItem("speed", wpm);
	}
}

function decreaseWPM() {
	if (wpm-50>0) {
		wpm = wpm-50;
		wpmDiv.innerHTML = "WPM: "+wpm;
		localStorage.setItem("speed", wpm);
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

document.addEventListener("DOMContentLoaded", init, false);



