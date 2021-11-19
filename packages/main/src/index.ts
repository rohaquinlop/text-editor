import {app, BrowserWindow, shell, ipcMain, dialog, Notification, Menu} from 'electron';
import {join} from 'path';
import {URL} from 'url';

const fs = require('fs');
const path = require('path')

const ipc = ipcMain
const isSingleInstance = app.requestSingleInstanceLock();
let openedFilePath;

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

// Install "Vue.js devtools"
if (import.meta.env.MODE === 'development') {
  app.whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({default: installExtension, VUEJS3_DEVTOOLS}) => installExtension(VUEJS3_DEVTOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    }))
    .catch(e => console.error('Failed install extension:', e));
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    vibrancy: 'under-window',
    visualEffectState: 'active',
    width: 900,
    height: 700,
    minWidth: 940,
    minHeight: 560,
    //titleBarStyle: "hiddenInset",
    //frame: false,
    webPreferences: {
      nativeWindowOpen: true,
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();

    /*
    if (import.meta.env.MODE === 'development') {
      mainWindow?.webContents.openDevTools();
    }
    */
  });

   mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  const pageUrl = import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();


  await mainWindow.loadURL(pageUrl);
  const menuTemplate =
    [
      {
        label: "File",
        submenu: [
          {
            accelerator: "Ctrl+O",
            label: "Open File...",
            click: () => ipc.emit("open-document-triggered"),//TODO
          },
          {
            accelerator: "Ctrl+S",
            label: "Save File...",
            click: () => mainWindow.webContents.send("save-file-bar"),//TODO
          },
          {
            accelerator: "Ctrl+N",
            label: "New File...",
            click: () => ipc.emit("create-document-triggered"),//TODO
          }
        ]
      }
    ]

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed create window:', e));

/*
const handleError = () => {
  new Notification({
    title: "Error",
    body: "Lo siento, algo salio mal :("
  }).show();
}
*/

// Auto-updates
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}

/*
//Open Document
ipc.on("open-document-triggered", () => {
  dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Markdown", extensions: ["md"] }],
  }).then(({ filePaths }) => {
    const filePath = filePaths[0];

    fs.readFile(filePath, "utf8", (error, content) => {
      if (error) {
        handleError();
      }
      else {
        openedFilePath = filePath;
        mainWindow.webContents.send("document-opened", { filePath, content });
      }
    });
  }
  );
});

//Create document
ipc.on("create-document-triggered", () => {
  dialog.showSaveDialog(mainWindow, {
    filters: [{ name: "Markdown", extensions: ["md"] }],
  }).then(({ filePath }) => {
    fs.writeFile(filePath, "", (error) => {
      if (error) {
        handleError();
      }
      else {
        openedFilePath = filePath;
        mainWindow.webContents.send("document-created", filePath);
      }
    })
  })
});

//Save File
ipc.on("save-file", (_, textAreaContent) => {
  fs.writeFile(openedFilePath, textAreaContent, (error) => {
    if (error) {
      handleError();
    }
  });
});

//Close App
ipc.on("close-app", () => {
  mainWindow.close();
});

//Maximize App
ipc.on("maximize-app", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  }
  else {
    mainWindow.maximize();
  }
});

//Minimize App
ipc.on("minimize-app", () => {
  mainWindow.minimize();
});
*/
