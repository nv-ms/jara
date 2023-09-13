const axiosInstance = axios.create({
    baseURL: 'http://localhost:5500',
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
  });