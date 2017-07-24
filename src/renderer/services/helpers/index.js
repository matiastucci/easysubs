import Vue from 'vue'
const bus = new Vue()

const electron = require('electron')
const shell = electron.shell
const ipcRenderer = electron.ipcRenderer

function setupExternalLinks () {
  const supportExternalLinks = function (e) {
    let href
    let isExternal = false
    const checkDomElement = function (element) {
      if (element.nodeName === 'A') {
        href = element.getAttribute('href')
      }
      if (element.classList.contains('js-external-link')) {
        isExternal = true
      }
      if (href && isExternal) {
        shell.openExternal(href)
        e.preventDefault()
      } else if (element.parentElement) {
        checkDomElement(element.parentElement)
      }
    }
    checkDomElement(e.target)
  }
  document.addEventListener('click', supportExternalLinks, false)
}

function listenToPing () {
  ipcRenderer.on('ping', (event, message) => {
    console.log('ping: ', message)
    switch (message) {
      case 'update-available':
      case 'update-downloaded':
      case 'update-error':
        bus.$emit(message)
        break
      default:
        break
    }
  })
}

function toggleDevTools () {
  electron.remote.getCurrentWindow().toggleDevTools()
}

function quitAndInstall () {
  electron.remote.autoUpdater.quitAndInstall()
}

export default {
  setupExternalLinks,
  listenToPing,
  toggleDevTools,
  quitAndInstall,
  bus
}
