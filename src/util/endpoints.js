import axios from 'axios'
import { useUserStore } from 'src/stores/user'

export const apiEndpoint = axios.create({
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
