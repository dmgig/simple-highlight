chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = tabs[0].url;
      var value = url + ' - ' + selection[0];
      document.getElementById("output").innerHTML = value;

      chrome.storage.local.set({"test": value}, function() {
        console.log('Value is set to ' + value);
      });

    });


});
