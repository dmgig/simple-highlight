chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {

  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {

    var selected = selection[0];
    document.getElementById("output").innerHTML = selected;

    // find dates
    var chParse = chrono.strict.parse(selected);
    var date;
    if(chParse.length){
      date = moment(chParse[0].text).format("YYYY-MM-DD");
    }else{
      alert('No date!');
      return;
    }

    // build object
    var entry = {
      url: tabs[0].url,
      value: selection[0],
      date: date
    };

    // store data
    chrome.storage.local.get(['test'], function(result) {
      var stored;
      if(typeof result.test === typeof undefined) stored = [];
      else stored = JSON.parse(result.test);
      stored.push(entry);
      var sortedStored = stored.sort(function(a, b){
        return (a.date < b.date) ? -1 : (a.date > b.date) ? 1 : 0;
      });
      chrome.storage.local.set({"test": JSON.stringify(sortedStored, null, 2)});
    });

  });
});
