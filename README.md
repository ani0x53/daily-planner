# ✅ Daily Planner — macOS Menubar App

A tiny menubar app that lives in your Mac's top bar. Click the icon, see your day. That's it.

No dock icon. No window management. Just your tasks, always one click away.

<!-- Add a screenshot here after building: ![screenshot](assets/screenshot.png) -->

## What You See When You Click

| Section | What it shows |
|---------|--------------|
| **NOW** | Tasks scheduled for the current hour |
| **OVERDUE** | Any past tasks you haven't checked off (shown in red, pulsing dot) |
| **NEXT UP** | Your upcoming tasks for the rest of the day |
| **FULL DAY** | Expandable hour-by-hour timeline (6 AM – 10 PM) |

Every task shows its **priority** (Low / Medium / High / Urgent, color-coded) and **due date**.

Tasks don't disappear until you check them off. Overdue tasks stay red and visible until done.

## Keyboard Shortcut

Press **⌘⇧P** (Cmd+Shift+P) anywhere to toggle the planner open/closed.

## Installation

### Prerequisites

**Node.js 18+** is required. If you don't have it:

```bash
# Option A: Homebrew (recommended)
brew install node

# Option B: Download from https://nodejs.org
```

Verify:

```bash
node --version   # v18+ required
npm --version
```

### Run from source

```bash
git clone https://github.com/YOUR_USERNAME/daily-planner.git
cd daily-planner
npm install
npm start
```

A checklist icon appears in your menubar. Click it. Done.

### Build a standalone .app

To build a distributable macOS app you can drag to Applications:

```bash
npm run build
```

Find the `.app` and `.dmg` in the `dist/` folder. Double-click the `.dmg`, drag Daily Planner to Applications, and it'll be there every time you log in.

### Auto-start on login (optional)

After installing, open **System Settings → General → Login Items** and add Daily Planner so it launches automatically when you start your Mac.

## Usage

| Action | How |
|--------|-----|
| **Open/close** | Click menubar icon or press ⌘⇧P |
| **Add a task** | Click `+ Quick Add` or expand Full Day and click `+ add` on any hour |
| **Set priority** | Choose Low / Medium / High / Urgent when adding |
| **Set due date** | Pick a date — defaults to today |
| **Mark done** | Click the checkbox — task gets a strikethrough |
| **Remove** | Check it off first, then click × |
| **Clear all done** | Click "Clear N done" in the bottom bar |
| **View full schedule** | Click the ▸ arrow next to FULL DAY |

The popup automatically closes when you click anywhere else on screen.

## How It Works

The entire app is three files:

```
daily-planner/
├── main.js        # Electron: tray icon, popup window positioning
├── index.html     # The entire UI — zero build tools, no framework
├── package.json   # Dependencies and build config
├── assets/
│   └── icon.svg
├── LICENSE
└── README.md
```

Tasks are stored in `localStorage` on your machine. Nothing is sent anywhere.

## Dark Mode

Automatically follows your macOS appearance setting. No toggle needed.

## Customization

**Change the keyboard shortcut:** Edit `main.js`, find `CommandOrControl+Shift+P`, replace with your preferred combo.

**Change the window size:** Edit `main.js`, adjust `width: 360, height: 520`.

**Change the hours shown:** Edit `index.html`, find `Array.from({ length: 17 }, (_, i) => i + 6)` — change `17` (number of hours) and `6` (start hour).

## Tech Stack

- [Electron](https://www.electronjs.org/) — native macOS window and tray
- Vanilla HTML/CSS/JS — no React, no build step, no bundler
- `localStorage` — tasks persist locally

## Contributing

PRs welcome. The whole UI is one HTML file on purpose — keep it simple.

## License

MIT
