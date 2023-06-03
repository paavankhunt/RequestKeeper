function submitForm() {
  const url = document.getElementById('url').value;
  const method = document.getElementById('method').value;
  const header = document.getElementById('header').value;
  const body = document.getElementById('body').value;

  // Send the request to background.js
  chrome.runtime.sendMessage(
    { url, method, header, body },
    function (response) {
      const formattedResponse = JSON.stringify(JSON.parse(response), null, 2);
      document.getElementById('response').innerText = formattedResponse;
    }
  );
}

document.getElementById('apiForm').addEventListener('submit', function (event) {
  event.preventDefault();
  submitForm();
});
