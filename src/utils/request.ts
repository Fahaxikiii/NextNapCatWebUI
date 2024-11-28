import axios from 'axios'

let _storeURL = localStorage.getItem('storeURL') ?? '"http://localhost:3000"'

_storeURL = JSON.parse(_storeURL)

const baseURL = _storeURL + '/api'

export const serverRequest = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

export const request = axios.create({
  timeout: 5000
})

serverRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`
  }

  return config
})

serverRequest.interceptors.response.use((response) => {
  if (response.data.code !== 0) {
    if (response.data.message === 'Unauthorized') {
      const token = localStorage.getItem('token')
      if (token && JSON.parse(token)) {
        localStorage.removeItem('token')
        window.location.reload()
      }
    }
    throw new Error(response.data.message)
  }

  return response
})