import axios from 'axios'
import { useUserStore } from 'src/stores/user'

export const apiEndpoint = axios.create({
  baseURL: process.env.STRAPI_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  transformRequest: [(data, headers) => {
    const userStore = useUserStore()
    // If the user is authenticated add the Authorization header.
    if (userStore.isAuthenticated) {
      headers['Authorization'] = `Bearer ${userStore.jwt}`
    }
    return JSON.stringify(data)
  }]
})

// Catch failures when the user is considered authenticated and sign the user out.
apiEndpoint.interceptors.response.use(function (response) {
  // do nothing extra.
  return response
}, function (error) {
  console.error(error)
  // If there was an Unauthorized failure and the user was signed in, the jwt is prob expired, so sign out.
  if (error.response?.status === 401) {
    const userStore = useUserStore()
    if (userStore.isAuthenticated) {
      console.log('sign in expired, signing out..')
      userStore.signOut()
    }
  }
  return Promise.reject(error)
})
