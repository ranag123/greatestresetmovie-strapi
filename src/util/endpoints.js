import axios from 'axios'
import { useUserStore } from 'src/stores/user'

export const apiEndpoint = axios.create({
  transformRequest: (data, headers) => {
    const userStore = useUserStore()
    // If the user is authenticated add the Authorization header.
    if (userStore.isAuthenticated) {
      headers['Authorization'] = `Bearer ${userStore.jwt}`
    }
    return data
  }
})
