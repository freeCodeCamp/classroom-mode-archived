const mockHttpRequest = () => Promise.resolve({ data: {} })

export default {
  get: jest.fn(mockHttpRequest),
  post: jest.fn(mockHttpRequest),
  put: jest.fn(mockHttpRequest),
}
