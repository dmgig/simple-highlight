chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {

  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {

    var selected = selection[0].stripHTML().replace(/\n/g, " ").trim();
    document.getElementById("workspace__source").innerHTML = selected;

    // find dates
    var chParse = chrono.parse(selected);
    console.log(chParse)
    var date;
    if(chParse.length){
      date = moment(chParse[0].start.date()).format("YYYY-MM-DD");
    }else{
      date = 'NOTE';
    }

    // build object
    var entry = {
      url: tabs[0].url,
      value: selection[0],
      hash: selection[0].hashCode(),
      date: date
    };

    // store data
    chrome.storage.local.get(['test'], function(result) {
      var stored;
      if(typeof result.test === typeof undefined) stored = [];
      else stored = JSON.parse(result.test);
      if(containsObjectWithProperty(stored, 'hash', entry.hash)){
        alert('Already stored.');
        return;
      }
      stored.push(entry);
      var sortedStored = stored.sort(function(a, b){
        return (a.date < b.date) ? -1 : (a.date > b.date) ? 1 : 0;
      });
      chrome.storage.local.set({"test": JSON.stringify(sortedStored, null, 2)});
    });

  });
});
