'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const os = require('os')
const BrowserWindow = electron.BrowserWindow
const autoUpdater = electron.autoUpdater

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 350,
    height: 350,
    minHeight: 350,
    minWidth: 350,
    title: 'Easysubs',
    backgroundColor: '#eee',
    // frame: process.platform === 'darwin',
    // transparent: true,
    // titleBarStyle: 'hidden-inset', // macOS only
  })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('did-finish-load', () => {
    const platform = os.platform() + '_' + os.arch()
    const version = app.getVersion()
    autoUpdater.setFeedURL(`https://easysubs-autoupdater.herokuapp.com/update/${platform}/${version}`)
    console.log(`https://easysubs-autoupdater.herokuapp.com/update/${platform}/${version}`)
    autoUpdater.on('error', (ev, err) => {
      console.log(err)
    });
  })

  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
