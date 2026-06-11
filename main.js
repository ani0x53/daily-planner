const {
  app,
  BrowserWindow,
  Tray,
  nativeImage,
  screen,
  globalShortcut,
} = require("electron");
const path = require("path");

// Hide from dock — menubar only
app.dock?.hide();

let tray = null;
let win = null;

/* ── tiny 18×18 checklist icon drawn as a template image ── */
function createTrayIcon() {
  // 18x18 RGBA buffer — black pixels on transparent, macOS auto-tints
  const w = 18, h = 18;
  const buf = Buffer.alloc(w * h * 4, 0);

  function px(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const i = (y * w + x) * 4;
    buf[i] = 0; buf[i + 1] = 0; buf[i + 2] = 0; buf[i + 3] = 255;
  }
  function hLine(x1, x2, y) { for (let x = x1; x <= x2; x++) px(x, y); }
  function rect(x1, y1, x2, y2) {
    hLine(x1, x2, y1); hLine(x1, x2, y2);
    for (let y = y1; y <= y2; y++) { px(x1, y); px(x2, y); }
  }

  // Checkbox outline 3x5 → 7x9
  rect(2, 3, 6, 7);
  // Checkmark
  px(3, 5); px(4, 6); px(5, 5); px(6, 4);

  // Lines
  hLine(9, 15, 4); hLine(9, 15, 6);

  // Checkbox 2
  rect(2, 10, 6, 14);

  // Lines
  hLine(9, 15, 11); hLine(9, 13, 13);

  const img = nativeImage.createFromBuffer(buf, {
    width: w, height: h, scaleFactor: 1,
  });
  img.setTemplateImage(true);
  return img;
}

function createWindow() {
  win = new BrowserWindow({
    width: 360,
    height: 520,
    show: false,
    frame: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    transparent: false,
    alwaysOnTop: true,
    vibrancy: "popover",
    visualEffectState: "active",
    roundedCorners: true,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile("index.html");

  // Hide when losing focus
  win.on("blur", () => {
    win.hide();
  });
}

function toggleWindow() {
  if (!win) return;
  if (win.isVisible()) {
    win.hide();
    return;
  }

  // Position window below the tray icon
  const trayBounds = tray.getBounds();
  const winBounds = win.getBounds();
  const display = screen.getDisplayNearestPoint({
    x: trayBounds.x,
    y: trayBounds.y,
  });

  let x = Math.round(trayBounds.x + trayBounds.width / 2 - winBounds.width / 2);
  let y = Math.round(trayBounds.y + trayBounds.height + 4);

  // Keep within screen
  const area = display.workArea;
  if (x + winBounds.width > area.x + area.width) x = area.x + area.width - winBounds.width;
  if (x < area.x) x = area.x;

  win.setPosition(x, y, false);
  win.show();
  win.focus();
}

app.whenReady().then(() => {
  tray = new Tray(createTrayIcon());
  tray.setToolTip("Daily Planner");
  tray.on("click", toggleWindow);
  tray.on("right-click", toggleWindow);

  createWindow();

  // Optional global shortcut: Ctrl+Shift+P to toggle
  globalShortcut.register("CommandOrControl+Shift+P", toggleWindow);
});

app.on("window-all-closed", (e) => e.preventDefault());

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
