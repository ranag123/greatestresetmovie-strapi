export function devlog (...rest) {
  if (process.env.DEV) {
    console.log(...rest)
  }
}

// for convenience add the quasar openURL function.
export function openURL (url) {
  openURL(url)
}

// TODO: gab?
export function shareViaTweet (shareText, shareUrl = null) {
  shareUrl = shareUrl || window.location.href
  shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  openURL(shareUrl, 'width=535,height=400')
}

export function shareViaFacebook (shareUrl = null) {
  shareUrl = shareUrl || window.location.href
  shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  openURL(shareUrl, 'width=600,height=400,scrollbars=no')
}

export function shareViaWhatsapp (shareUrl = null) {
  shareUrl = shareUrl || window.location.href
  shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`
  openURL(shareUrl, 'width=600,height=400,scrollbars=no')
}

export function shareViaEmail (subject, shareUrl = null) {
  shareUrl = shareUrl || window.location.href
  shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(shareUrl)}`
  openURL(shareUrl)
}
