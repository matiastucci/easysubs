let subLanguage = JSON.parse(window.localStorage.getItem('subLanguage')) || { value: 'eng' }
let subExtension = JSON.parse(window.localStorage.getItem('subExtension')) || { value: 'srt' }

function get () {
  return {
    subLanguage,
    subExtension
  }
}

function set (lang, ext) {
  subLanguage = lang
  subExtension = ext
  window.localStorage.setItem('subLanguage', JSON.stringify(subLanguage))
  window.localStorage.setItem('subExtension', JSON.stringify(subExtension))
}

export default {
  get,
  set
}
