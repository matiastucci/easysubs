import Analytics from 'electron-google-analytics'

let analytics
const develop = process.env.NODE_ENV === 'development'

function init () {
  if (develop) return
  analytics = new Analytics('UA-8293285-13')
}

function pageView (section) {
  if (develop || !analytics) return
  analytics.pageview('https://tucci.me/projects/easysubs', section)
}

export default {
  init,
  pageView
}
