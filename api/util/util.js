const createError = require('http-errors')
const _ = require('lodash')
const Filter = require('bad-words')
const sanitizeHTML = require('sanitize-html')

// TODO: This file is adapted form Sacrificing Liberty and is a WIP

const {
  AZURE_FUNCTIONS_ENVIRONMENT
} = process.env

const IS_DEV = AZURE_FUNCTIONS_ENVIRONMENT === 'Development'

const util = {
  /**
   * Adds common headers without overwriting if there is a conflict.
   * @param req The request.
   * @param headers Current headers.
   * @return {NonNullable<any>}
   */
  appendCommonHeaders: async function (req, headers) {
    // NOTE: The function is async now just to avoid adding await in all the places if it were added here later as needed.
    const append = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
      // a few headers based on @middy/http-security-headers
      'x-dns-prefetch-control': 'off',
      'x-download-options': 'noopen',
      'referrer-policy': 'no-referrer',
      'x-permitted-cross-domain-policies': 'none',
    }
    return _.defaults({ ...headers }, append)
  },

  /**
   * Sanitizes and optionally trims & removes bad words from the given string value.
   * @param val The string value to clean up.
   * @param maxLength An optional maxlength for the value.
   * @param removeBadWords Flags if bad words should be removed.
   * @return The cleanup up value.
   */
  cleanupInput: function (val, {
    maxLength = false,
    removeBadWords = false
  } = {}) {
    const badWordsFilter = new Filter({ placeHolder: ' ' })

    let clean = sanitizeHTML(val, {
      allowedTags: [],
      allowedAttributes: [],
      parser: {
        decodeEntities: false
      }
    })

    if (removeBadWords) {
      clean = badWordsFilter.clean(clean)
    }

    // do this after the bad words in case it left empty spaces.
    clean = _.trim(clean)

    if (maxLength) {
      return _.truncate(clean, { length: maxLength })
    }
    return clean
  },

  /**
   * Attempts to find a message from zype, generally these are from a 422 error.
   * @param zypeResponse The axios response from the zype api call.
   * @return {*|createHttpError.HttpError} The error to throw.
   */
  createZypeError (zypeResponse) {
    // Hand back the error message with the same status given by zype.
    // zype support claims the messages should be ok to show the user after the colon.
    // Default to undefined so createError will use its default message.
    const msg = _.get(zypeResponse, 'data.message', '').split(':').pop()
    if (msg.length > 0) {
      console.log('ZYPE MESSAGE: ', msg)
      return createError(zypeResponse.status, msg)
    } else {
      const status = _.get(zypeResponse, 'status', false)
      if (status) {
        return createError(zypeResponse.status)
      }
    }
    // Can't tell what error there was, so default to a 422.
    return createError.UnprocessableEntity()
  },

  /**
   * Returns a response object to indicate the given error or the default error.
   * @param err The error
   * @param headers
   * @param defaultError
   * @return {{headers: {}, body: *, status: *}}
   */
  getResponseError: function (err, { headers = {}, defaultError = null } = {}) {
    let errStatus = _.get(err, 'status')
    let errMessage = _.get(err, 'message')

    if (!errStatus || !errMessage) {
      if (!defaultError) defaultError = new createError.UnprocessableEntity()
      errStatus = _.get(defaultError, 'status')
      errMessage = _.get(defaultError, 'message')
    }

    return {
      status: errStatus,
      headers,
      body: errMessage
    }
  },

  /**
   * If we are running locally.
   * @return {boolean}
   */
  isDev: function () {
    return IS_DEV
  }
}

module.exports = util
