# MyGym - Workout Engine

A high-performance mobile web application for fitness tracking and workout management. Built with React 18+, Material-UI, and state machine patterns.

## 📋 What is MyGym?

MyGym provides a user-friendly UI for implementing fitness routines defined in `routines.json`. The routines are fully customizable for each individual's specific needs, whether following guidance from a fitness professional or using free-tier LLM support (such as Google Gemini).

**To customize your routines:**
- Open `public/routines.json` in your preferred text editor
- Attach the JSON file to a free-tier LLM like [Google Gemini](https://gemini.google.com)
- Request modifications to match your fitness goals, available equipment, and experience level
- The LLM will provide updated JSON that you can paste back into the file
- Reload the app to see your custom routine

This approach allows you to create personalized workouts without needing coding knowledge while leveraging AI assistance or professional expertise.

## 🎯 Features


- **State Machine Workflow**: Smooth transitions through SELECT_DAY → SUMMARY → PREPARING → EXECUTING states
- **Flexible Exercise Types**:
  - **Timed Exercises**: Automatic MM:SS countdown with auto-advance
  - **Rep Exercises**: Manual "Done" button completion
- **Responsive Design**: Mobile-first with touch-friendly buttons (min 44px height)
- **Gym-Style Dark Theme**: Dark background (#121212) with neon green accent (#00E676)
- **Pause/Resume Control**: Freeze timer anytime during workout
- **Multi-Day Routines**: Support for Day 1-4 with customizable exercises and equipment lists

## 📦 Prerequisites

- Node.js 16+ (Download from [nodejs.org](https://nodejs.org/))
- npm (comes with Node.js)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages:
- React 18
- React Router DOM v6
- Material-UI v6 + Icons
- Vite (build tool)

### 2. Start Development Server

```bash
npm run dev
```

The app will launch at: `http://localhost:5173`

### 3. Open in Browser

Navigate to `http://localhost:5173` and select a workout day to begin.

## 🏗️ Project Structure

```
mygym-app/
├── public/
│   └── routines.json              # Workout database
├── src/
│   ├── components/
│   │   ├── WorkoutEngine.jsx      # Main orchestrator (PREPARING → EXECUTING)
│   │   ├── HomeView.jsx           # Day selection (SELECT_DAY)
│   │   ├── SummaryView.jsx        # Routine preview (SUMMARY)
│   │   ├── views/
│   │   │   ├── PreparingView.jsx  # 5-sec countdown
│   │   │   ├── ExecutingView.jsx  # Active exercise display
│   │   │   └── PausedView.jsx     # Pause overlay menu
│   ├── hooks/
│   │   ├── useWorkoutState.js     # State machine logic
│   │   └── useWorkoutTimer.js     # Interval management
│   ├── utils/
│   │   └── timeFormatter.js       # MM:SS formatting
│   ├── App.jsx                    # Router & theme provider
│   └── main.jsx                   # Vite entry point
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
├── agents.md                      # Coding standards
├── context.md                     # Project context
├── specs.md                       # Technical specifications
└── README.md                      # This file
```

## 📋 State Machine Flow

```
SELECT_DAY (HomeView)
    ↓ [Pick Day 1-4]
SUMMARY (SummaryView)
    ↓ [Start Workout]
PREPARING (5-sec countdown)
    ↓ [Timer ends]
EXECUTING (Active exercise)
    ├─ If timed: auto-advance when timer hits 0
    ├─ If reps: wait for "Done" button
    └─ [Pause] → PAUSED (Overlay menu)
        ├─ [Resume] → EXECUTING
        └─ [Quit] → SELECT_DAY
FINISHED (Completion)
    ↓ [Return Home]
SELECT_DAY
```

## ⚙️ Building for Production & GitHub Pages Deployment

### Build the Project

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to GitHub Pages (Automatic)

The project includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages on every push to `main` or `master` branches.

**Setup Instructions:**

1. **Push your repository to GitHub** with this project
2. **Enable GitHub Pages** in your repository settings:
   - Go to **Settings** → **Pages**
   - Select **Deploy from a branch**
   - Choose **branch: gh-pages** (will be created automatically by the workflow)
   - Save

3. **Push code to trigger deployment**:
   ```bash
   git push origin main
   ```

The GitHub Actions workflow will automatically:
- Install dependencies
- Build the project
- Deploy to GitHub Pages

Your app will be available at: `https://YOUR-USERNAME.github.io/mygym-app/`

### Deploy to GitHub Pages (Manual)

If you prefer manual deployment:

1. Build locally:
   ```bash
   npm run build
   ```

2. Install `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json` scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

**Note:** The `base` URL in `vite.config.js` is already set to `/mygym-app/` for correct routing in GitHub Pages subfolders.

## 🎮 How to Use

### Starting a Workout

1. **Select a Day**: Click on a day card (Day 1-4) from the home screen
2. **Review Summary**: Check exercise list, descriptions, and required equipment
3. **Start**: Click "Start Workout" button

### During Workout

- **Timed Exercises**: Watch the MM:SS countdown. Timer auto-advances when it reaches 00:00.
- **Rep Exercises**: Perform the reps, then click "Done" to advance.
- **Pause Anytime**: Click the green pause button (floating action button) at bottom-right.
- **Resume**: Click "Resume" from the pause menu.
- **Quit**: Click "Quit Workout" to return to home (your progress is lost).

## 🔧 Configuration

### Customizing Routines

Edit `public/routines.json` to add/modify workout routines. Example structure:

```json
{
  "routines": [
    {
      "id": "day-1",
      "title": "Day 1: Upper Strength",
      "blocks": [
        {
          "category": "warmup",
          "rounds": 1,
          "exercises": [
            {
              "id": "d1-w1",
              "name": "Jump Rope",
              "description": "Warm up with light cardio",
              "goal": "5 min",
              "type": "timed",
              "duration": 300,
              "equipment": "Jump rope"
            }
          ]
        }
      ]
    }
  ]
}
```

### Theme Customization

Edit `src/App.jsx` to change theme colors:

```javascript
const darkTheme = createTheme({
  palette: {
    background: { default: '#121212' },
    primary: { main: '#00E676' },
  },
});
```

## 📱 Mobile Optimization

The app is fully responsive for mobile devices:
- Breakpoints: `xs` (mobile) and `md` (tablet+)
- All buttons have minimum 44px touch targets
- Vertical layout optimized for portrait orientation

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 already in use | Run `npm run dev -- --port 5174` |
| Routines not loading | Ensure `public/routines.json` exists and is valid JSON |
| Theme not applying | Clear browser cache or restart dev server |
| Timer not advancing | Check browser console for errors; ensure `useWorkoutTimer` cleanup is running |

## 🛠️ Development Standards

- **Language**: English only (code, comments, UI text)
- **Architecture**: Separation of concerns (hooks, views, utils)
- **Memory Leaks**: All intervals have cleanup in useEffect return
- **UI Library**: Material-UI (MUI) with `sx` prop for responsive styling
- **Clean Code**: Single responsibility, meaningful names, DRY principle

## 📚 Resources

- [React 18 Documentation](https://react.dev)
- [Material-UI Docs](https://mui.com)
- [React Router v6](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev)

## 📝 License

Private project for fitness tracking.

---

**Ready to crush your goals!** 💪
