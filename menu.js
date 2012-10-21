function callbackTestFunction(obj) { //works
  alert(obj.selectionText);
}


// Create selection menu
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Test '" + context + "' menu item";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": callbackTestFunction});
  console.log("'" + context + "' item:" + id);
}

