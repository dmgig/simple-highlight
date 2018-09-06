chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {

  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {

    // get data
    document.getElementById("output").innerHTML = selection[0];

    // build object
    var entry = {
      url: tabs[0].url,
      value: selection[0],
      date: '2018-10-11'
    };

    // store data
    chrome.storage.local.get(['test'], function(result) {
      var stored;
      if(typeof result.test === typeof undefined) stored = [];
      else stored = JSON.parse(result.test);
      console.log(stored)
      stored.push(entry);
      stored = stored.sort(function(a, b){
        return b.date - a.date;
      });

      chrome.storage.local.set({"test": JSON.stringify(stored, null, 2)});
    });

  });
});
