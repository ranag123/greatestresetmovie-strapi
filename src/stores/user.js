import { defineStore } from 'pinia'
import lscache from 'lscache'
import { apiEndpoint } from 'src/util/endpoints'

const AUTH_CACHE_KEY = 'auth'
const SEVEN_DAYS_IN_MINUTES = 60 * 24 * 7

function getValidationError (error) {
  if (error?.details?.errors instanceof Array) {
    // grab the first one
    return error.details.errors?.[0]
  }
  return error
}

export const useUserStore = defineStore('user', {
  state: () => {
    lscache.flushExpired()
    const state = lscache.get(AUTH_CACHE_KEY)
    return {
      authUser: state?.u,
      jwt: state?.j
    }
  },

  getters: {
    isAuthenticated (state) {
      return !!(state.authUser && state.jwt && state.zype)
    },
    zype (state) {
      return state.authUser?.zypeOAuth
    }
  },

  actions: {
    me () {
      return apiEndpoint.get('/api/me').then(({ data }) => {
        if (data) {
          this.authUser = data

          // save the info locally but expire it when the zype token will expire.
          // the zype expires_in is seconds, so convert to minutes
          this.persistAuthState(this.zype.expires_in / 60)
        }
      })
    },
    register (fullName, email, password) {
      // https://github.com/axios/axios
      return apiEndpoint.post('/api/auth/register', {
        username: email, // this has to be unique, so use email
        email,
        password,
        fullName // this is a custom field we added to the User schema & the registration callback.
      }, {
        validateStatus: function (status) {
          return status >= 200 && status < 300 || status == 400
        },
      }).then(({ data }) => {
        if (data?.error) {
          if (data.error?.name === 'ValidationError' || data?.error?.message === 'Email is already taken') {
            const err = getValidationError(data.error)
            if (err) throw err
          }
        } else if (data) {
          this.authUser = data?.user
          this.jwt = data?.jwt
          // save the info locally but expire it when the zype token will expire.
          // the zype expires_in is seconds, so convert to minutes
          this.persistAuthState(this.zype.expires_in / 60)
        } else {
          throw new Error() // let the UI set the message
        }
      })
    },
    recoverPassword (email) {
      // https://github.com/axios/axios
      return apiEndpoint.post('/api/auth/forgot-password', {
        email,
      }, {
        validateStatus: function (status) {
          return status >= 200 && status < 300 || status == 400
        },
      }).then(({ data }) => {
        if (data?.error) {
          if (data.error?.name === 'ValidationError') {
            const err = getValidationError(data.error)
            if (err) throw err
          }
          throw new Error('Unable to request password recovery.')
        }
      })
    },
    resetPassword (code, password, passwordConfirmation) {
      // This is step 2 of the recover password process after the user received an email with a link to reset.
      // https://github.com/axios/axios
      return apiEndpoint.post('/api/auth/reset-password', {
        code,
        password,
        passwordConfirmation
      }, {
        validateStatus: function (status) {
          return status >= 200 && status < 300 || status == 400
        },
      }).then(({ data }) => {
        if (data?.error) {
          if (data.error?.name === 'ValidationError') {
            const err = getValidationError(data.error)
            if (err) throw err
          }
          throw new Error('Unable to reset your password.')
        }
      })
    },
    sendEmailConfirmation (email) {
      // https://github.com/axios/axios
      return apiEndpoint.post('/api/auth/send-email-confirmation', {
        email,
      }, {
        validateStatus: function (status) {
          return status >= 200 && status < 300 || status == 400
        },
      }).then(({ data }) => {
        if (data?.error) {
          if (data.error?.name === 'ValidationError') {
            const err = getValidationError(data.error)
            if (err) throw err
          }
          throw new Error('Unable to send the confirmation email.')
        }
      })
    },
    signIn (identifier, password) {
      // https://github.com/axios/axios
      return apiEndpoint.post('/api/auth/signin', {
        identifier,
        password
      }, {
        validateStatus: function (status) {
          return status >= 200 && status < 300 || status == 400
        },
      }).then(({ data }) => {
        if (data?.error) {
          if (data.error?.name === 'ValidationError' || data?.error?.message === 'Your account email is not confirmed') {
            const err = getValidationError(data.error)
            if (err) throw err
          }
        } else if (data) {
          this.authUser = data?.user
          this.jwt = data?.jwt
          // save the info locally but expire it when the zype token will expire.
          // the zype expires_in is seconds, so convert to minutes
          this.persistAuthState(this.zype.expires_in / 60)
        } else {
          throw new Error() // let the UI set the message
        }
      })
    },
    signOut () {
      // NOTE: this doesn't expire the jwt on the server.
      this.authUser = undefined
      this.jwt = undefined
      lscache.remove(AUTH_CACHE_KEY)
    },
    persistAuthState (timeInMinutes = SEVEN_DAYS_IN_MINUTES) {
      if (this.isAuthenticated) {
        lscache.set(AUTH_CACHE_KEY, {
          u: this.authUser,
          j: this.jwt
        }, timeInMinutes)
      } else {
        console.warn('no auth state to persist')
      }
    }
  }
})
