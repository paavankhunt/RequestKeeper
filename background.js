chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { url, header, body, method } = request;
  console.log(request);
  fetch(url, {
    method: method ?? 'POST',
    headers: header
      ? header.split(',').reduce((acc, header) => {
          const [key, value] = header.split(':');
          acc[key.trim()] = value.trim();
          return acc;
        }, {})
      : { 'Content-Type': 'application/json' },
    body: body ? body : undefined,
    // body: body ? JSON.stringify(body) : undefined
  })
    .then((response) => response.text())
    .then((data) => {
      sendResponse(data);
    })
    .catch((error) => {
      console.error(error);
      sendResponse('Error occurred during API request.');
    });

  return true; // Indicates that sendResponse will be called asynchronously
});
