import { template } from 'lodash'

export const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID

export const DEFAULT_TIMEZONE = 'America/New_York'

export const ZYPE_PLAYER_KEY = process.env.ZYPE_PLAYER_KEY
export const ZYPE_PREVIEW_VIDEO_ID = process.env.ZYPE_PREVIEW_VIDEO_ID
export const ZYPE_PREVIEW_ALT1_VIDEO_ID = process.env.ZYPE_PREVIEW_ALT1_VIDEO_ID
export const ZYPE_PREVIEW_ALT2_VIDEO_ID = process.env.ZYPE_PREVIEW_ALT2_VIDEO_ID
export const ZYPE_DOCUMENTARY_VIDEO_ID = process.env.ZYPE_DOCUMENTARY_VIDEO_ID

// export const VIDEO_PRODUCT_TYPES = {
//   PLAYLIST: 'playlist',
//   VIDEO: 'video'
// }
//
// export const VIDEO_PRODUCT_TRANSACTION_TYPES = {
//   PURCHASE: 'purchase',
//   RENTAL: 'rental'
// }

// export const VIDEO_PRODUCT_TYPE_VIDEO = 'video'
// export const SUPPORTED_VIDEO_PRODUCT_TYPES = [VIDEO_PRODUCT_TYPES.PLAYLIST, VIDEO_PRODUCT_TYPES.VIDEO]

export const ADDRESS = {
  infoEmail: 'info@truhistory.com'
}

// Uses a lodash template for components to get a
// consistent source url for zype videos.
// https://lodash.com/docs/4.17.15#template
export const VIDEO_SRC_TEMPLATE = template(`${process.env.ZYPE_PLAYER_BASE_URL}/embed/<%= vid %>.js?<%= authParam %>=<%= auth %>&autoplay=false&controls=true&dvr=true&showZype=false`)

// export const VIDEO_PRODUCT_ID_MAP = {
//   PURCHASE_ALL_PLAYLIST_ID: process.env.ZYPE_PRODUCT_PURCHASE_ALL_PLAYLIST_ID,
//   RENT_ALL_PLAYLIST_ID: process.env.ZYPE_PRODUCT_RENT_ALL_PLAYLIST_ID
// }

export const SERIES_TITLE = 'The Greatest Reset'
export const MESSAGES = {
  GENERAL_FORM_ERROR: 'Please verify the form fields are complete and correct.'
}
