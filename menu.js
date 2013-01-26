function callbackTestFunction(obj) { //works
  localStorage.setItem("selectedText", obj.selectionText);
  //alert(localStorage.getItem("selectedText")); 
  //window width height
    var width = 700;
    var height = 400;
    if (localStorage.getItem("width")> 0 && localStorage.getItem("height")>0) {
      width = localStorage.getItem("width");
      height=localStorage.getItem("height");
    }
    width = parseInt(width);
    height = parseInt(height);
  popupwindow("app.html", "", width, height);
}

function popupwindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

// Create selection menu
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Spreed selected text";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": callbackTestFunction});
  console.log("'" + context + "' item:" + id);
}

