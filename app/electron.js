'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const os = require('os')
const BrowserWindow = electron.BrowserWindow

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
    if (os.platform() !== 'darwin') { return }
    const autoUpdater = electron.autoUpdater
    const platform = os.platform() + '_' + os.arch()
    const version = app.getVersion()

    mainWindow.webContents.send('ping', `App version: ${version}`)

    autoUpdater.setFeedURL(`https://easysubs-autoupdater.herokuapp.com/update/${platform}/${version}`)
    autoUpdater.checkForUpdates()

    autoUpdater.on('error', (ev, err) => {
      mainWindow.webContents.send('ping', 'update-error')
      mainWindow.webContents.send('ping', err)
    });

    autoUpdater.on('checking-for-update', (ev, err) => {
      mainWindow.webContents.send('ping', 'checking-for-update')
    });

    autoUpdater.on('update-available', (ev, err) => {
      mainWindow.webContents.send('ping', 'update-available')
    });

    autoUpdater.on('update-not-available', (ev, err) => {
      mainWindow.webContents.send('ping', 'update-not-available')
    });

    autoUpdater.on('update-downloaded', (ev, err) => {
      mainWindow.webContents.send('ping', 'update-downloaded')
    });
  })
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
