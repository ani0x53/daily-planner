# Daily Planner

A minimal macOS desktop app to plan your day hour by hour.

Tasks stay on screen until you check them off. Overdue tasks turn red. That's it.

![Daily Planner](assets/icon.svg)

## Features

- **Hour-by-hour timeline** from 6 AM to 10 PM
- **Current hour highlighted** in blue so you always know where you are
- **Priority levels** — Low, Medium, High, Urgent — each color-coded
- **Due dates** on every task
- **Overdue detection** — tasks turn red with an OVERDUE badge when past their hour or due date
- **Tasks persist** — nothing disappears until you mark it done and remove it
- **Dark mode** — follows your system setting automatically
- **macOS native title bar** with traffic light buttons

## Prerequisites

You need **Node.js** (version 18 or later) and **npm** installed.

If you don't have Node.js, install it from [nodejs.org](https://nodejs.org/) or via Homebrew:

```bash
brew install node
```

Verify your installation:

```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
```

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/daily-planner.git
cd daily-planner
```

### 2. Install dependencies

```bash
npm install
```

This installs Electron and electron-builder. It may take a minute on the first run.

### 3. Run the app

```bash
npm start
```

The app window will open. You're done.

## Building a distributable .app / .dmg

To package the app as a standalone macOS application you can share:

```bash
npm run build
```

The built app will appear in the `dist/` folder. You'll find both a `.dmg` installer and a `.zip` archive.

To build only a `.dmg`:

```bash
npm run build-dmg
```

### Adding a custom app icon

Replace `assets/icon.png` with a 512×512 (or 1024×1024) PNG of your icon, then rebuild.

## Usage

| Action | How |
|---|---|
| **Add a task** | Click `+ add` on any hour slot |
| **Set priority** | Pick from the dropdown when adding (Low / Medium / High / Urgent) |
| **Set due date** | Pick a date when adding — defaults to today |
| **Mark done** | Click the checkbox — task gets a strikethrough and turns green |
| **Remove a task** | Mark it done first, then click the × button |
| **Clear all done** | Click the "Clear completed" button at the bottom |

Tasks are saved to your local storage automatically and persist between sessions.

## Project structure

```
daily-planner/
├── main.js          # Electron main process (window setup)
├── index.html       # The entire app UI (single file, no build step)
├── package.json     # Dependencies and build config
├── assets/
│   └── icon.svg     # App icon
├── LICENSE
└── README.md
```

## Contributing

PRs welcome. Keep it simple — the whole app is one HTML file on purpose.

## License

MIT
