document.getElementsByClassName('test')[0].innerHTML = 'test this';
chrome.storage.local.get(['test'], function(result) {
  document.getElementsByClassName('storage')[0].innerHTML = result.test;
});
