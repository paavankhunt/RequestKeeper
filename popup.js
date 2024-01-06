function submitForm(event) {
  event.preventDefault();
  const url = document.getElementById('url').value;
  const method = document.getElementById('method').value;
  const header = document.getElementById('header').value;
  const body = document.getElementById('body').value;

  chrome.runtime.sendMessage(
    { url, method, header, body, action: 'getApiResponse' },
    function (response) {
      const formattedResponse = JSON.stringify(JSON.parse(response), null, 2);
      document.getElementById('response').innerText = formattedResponse;
    }
  );
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getBodyContent') {
    var bodyContent = request.bodyContent;
    var bodyContentElement = document.getElementById('bodyContent');
    bodyContentElement.innerText = bodyContent;
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'getBodyContent' });
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('apiForm').addEventListener('submit', submitForm);
});
