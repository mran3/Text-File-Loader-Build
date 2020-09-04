const { app, ipcMain, BrowserWindow } = require('electron')
const fs = require('fs').promises;
const path = require('path');
const url = require('url');


function createWindow() {
  console.log('dir name:', __dirname)
  console.log('app getPath:', app.getAppPath())

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: app.getAppPath() + 'preload.js'
    }
  })

  // and load the index.html of the app.
  
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
 }));
  // //This is figuring out white screen issue.
  // win.once('ready-to-show', () => {

  //   win.show();

  // })
}

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