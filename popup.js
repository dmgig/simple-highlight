chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = tabs[0].url;
      document.getElementById("output").innerHTML = url + ' - ' + selection[0];
    });


});
