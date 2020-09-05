const { app, ipcMain, BrowserWindow } = require('electron')
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(app.getAppPath(), 'build/icon.png'),
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

// MARK: Entry point
if(require('electron-squirrel-startup')) return;
app.whenReady().then(createWindow)
app.on(
  "window-all-closed",
  () => process.platform !== "darwin" && app.quit()
);

ipcMain.handle('read-file', async (ipcEvent, path) => {
  if (path != undefined) {
    console.log('Load: ' + path)
    let loadedText = await fs.readFile(path, 'utf-8')
    return loadedText
  }
})