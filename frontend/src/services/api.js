import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  // Generation is the slowest call in the app (~30s). Without an explicit
  // timeout axios waits forever, so a stalled request leaves the user on the
  // loading screen with no way to know it failed.
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
