document.getElementsByClassName('test')[0].innerHTML = 'test this';
chrome.storage.local.get(['test'], function(result) {
  var stored = result.test;
  if(typeof JSON.parse(result.test) === typeof undefined) stored = [];
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
