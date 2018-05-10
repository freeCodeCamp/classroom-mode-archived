const mockResponse = (status, statusText, response) =>
  new window.Response(response, {
    status,
    statusText,
    headers: {
      'Content-type': 'application/json',
    },
  })

module.exports = mockResponse
