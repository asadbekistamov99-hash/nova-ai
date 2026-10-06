import { app, BrowserWindow, globalShortcut, Tray, Menu, nativeImage, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuitting = false;

function createTray() {
  // Generate a fallback 16x16 cyan dot icon if png doesn't exist
  const icon = nativeImage.createFromBuffer(
    Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVQ4T2NkoBAwUqifYdQAYjTB0DAgWw1DLV7whQdGk0RzBwN2U0ZNYdQAijXQ3kAA/9gCH4gKk78AAAAASUVORK5CYII=',
      'base64'
    )
  );

  tray = new Tray(icon);
  tray.setToolTip('NOVA AI - Your Intelligent Companion');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open NOVA AI',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      },
    },
    {
      label: 'Voice Command',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.webContents.send('shortcut-triggered', 'voice');
        }
      },
    },
    {
      label: 'Screenshot AI',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.webContents.send('shortcut-triggered', 'screenshot');
        }
      },
    },
    {
      label: 'Clipboard',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.webContents.send('shortcut-triggered', 'clipboard');
        }
      },
    },
    { type: 'separator' },
    {
      label: 'Private Mode',
      type: 'checkbox',
      checked: false,
      click: (item) => {
        mainWindow?.webContents.send('toggle-private-mode', item.checked);
      },
    },
    {
      label: 'Settings',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.webContents.send('shortcut-triggered', 'settings');
        }
      },
    },
    { type: 'separator' },
    {
      label: 'Exit',
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    frame: false,
    backgroundColor: '#040814',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  const prodIndex = path.resolve(__dirname, '../dist/index.html');

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else if (fs.existsSync(prodIndex)) {
    mainWindow.loadFile(prodIndex);
  } else {
    mainWindow.loadURL('http://localhost:5173');
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });
}

// IPC Window Controls (fixed handlers)
ipcMain.on('window-minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window-close', () => {
  if (mainWindow) {
    mainWindow.hide();
  }
});

app.whenReady().then(() => {
  createWindow();
  createTray();

  // Register Global Hotkey Ctrl+Space to toggle window
  globalShortcut.register('CommandOrControl+Space', () => {
    if (mainWindow) {
      if (mainWindow.isVisible() && mainWindow.isFocused()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });

  // Register Global Hotkey Ctrl+Shift+S for Screenshot AI
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.webContents.send('shortcut-triggered', 'screenshot');
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Keep running in tray on Windows unless explicitly quitting
  }
});
