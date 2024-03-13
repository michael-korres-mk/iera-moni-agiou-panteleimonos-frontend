import vueApp from '@/main'
// eslint-disable-next-line regex/invalid
import axios from 'axios'

const vueAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

vueAxios.defaults.headers.post['Content-Type'] = 'application/json'
vueAxios.defaults.headers.get.accepts = 'application/json'

const parseError = error => {
  let errorText = ''

  // The server response was received with a status code that falls out of the range of 2xx
  // OR
  // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  if (error.response || error.request) {
    const mode = error.response ? 'response' : 'request'

    if (!error[mode].data) {
      errorText = error[mode].statusText
    } else if (typeof error[mode].data === 'string') {
      errorText = error[mode].data
    } else if (error[mode].data.description) {
      errorText = error[mode].data.description
    } else if (error[mode].data.message) {
      errorText = error[mode].data.message
    } else if (error[mode].data.status) {
      errorText = error[mode].data.status
    }
  } else if (error.message) {
    // Something happened in setting up the request that triggered an error
    errorText = error.message
  } else {
    errorText = error
  }

  if (
    errorText === '' ||
    (typeof errorText === 'object' && Object.keys(errorText).length === 0)
  ) {
    return 'Something went wrong!'
  }

  // Capitalize first letter
  errorText = (str => {
    if (typeof str !== 'string') return str

    return str.charAt(0).toUpperCase() + str.slice(1)
  })(errorText)

  return errorText
}

vueAxios.throwError = error => Promise.reject(parseError(error))

vueAxios.handleError = error => parseError(error)

let pendingCalls = 0

// Progress bar loader on ajax request
vueAxios.interceptors.request.use(config => {
  if (!pendingCalls) {
    vueApp.config.globalProperties.$Progress.start()
  }
  pendingCalls += 1

  return config
})

// Add a response interceptor
vueAxios.interceptors.response.use(
  res => {
    pendingCalls -= 1
    if (!pendingCalls) {
      vueApp.config.globalProperties.$Progress.finish()
    }
    if (res.status === 302) {
      this.logoutUser()
    }

    return res
  },
  error => {
    // Show failed progress bar regardless if its the last call
    pendingCalls -= 1
    vueApp.config.globalProperties.$Progress.fail()
    if (error.response?.status === 401) {
      this.logoutUser()
    }

    return Promise.reject(error)
  },
)

export default vueAxios
