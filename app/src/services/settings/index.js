let subLanguage = JSON.parse(window.localStorage.getItem('subLanguage'))
  || { name: 'English', value: 'eng' }
let subExtension = JSON.parse(window.localStorage.getItem('subExtension'))
  || { name: '.srt', value: 'srt' }

function get() {
  return {
    subLanguage,
    subExtension,
  }
}

function set(lang, ext) {
  subLanguage = lang
  subExtension = ext
  window.localStorage.setItem('language', JSON.stringify(subLanguage))
  window.localStorage.setItem('subExtension', JSON.stringify(subExtension))
}

export default {
  get,
  set,
}
