chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getBodyContent') {
    var bodyContent = document.body.innerHTML;
    chrome.runtime.sendMessage({
      action: 'getBodyContent',
      bodyContent: bodyContent,
    });
  }
});
