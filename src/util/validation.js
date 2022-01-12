import isEmail from 'validator/es/lib/isEmail'
import isEmpty from 'validator/es/lib/isEmpty'

// Docs: https://github.com/validatorjs/validator.js

// ============================================================================
// Quasar form input rules arrays for ease of use
// ============================================================================

export const emailInputRules = [
  (val) => isEmail(val) || 'Enter a valid email address to continue'
]

export const emailRequiredInputRules = [
  (val) => !isEmpty(val) || 'Enter your email address to continue',
  ...emailInputRules
]

export const requiredInputRules = [
  (val) => !isEmpty(val) || 'This field is required'
]
