
chrome.storage.local.get(['test'], function(result) {
  var stored = result.test;
  if(typeof JSON.parse(result.test) === typeof undefined) stored = [];
  document.getElementById('rCount').innerHTML = 'Entries saved: '+JSON.parse(stored).length;
  document.getElementsByClassName('storage')[0].innerHTML = stored;
});

var clearButton = document.getElementById('clearStore');
clearButton.addEventListener('click', function(){
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
});

var downloadButton = document.getElementById('downloadStore');
downloadButton.addEventListener('click', function() {
  chrome.storage.local.get(['test'], function(result) {
    var stored = result.test;
    if(typeof JSON.parse(result.test) === typeof undefined) stored = '[]';
    var blob = new Blob([stored], {type: 'text/json'});
    if(window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, 'filename.json');
    }
    else{
      var elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = 'filename.json';
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  });
});
