# PROJECT CONTEXT: PULSE & POWER APP

## 1. PROJECT BLUEPRINT
This project is governed by three core documents:
1. `agents.md`: Defines your persona and coding standards.
2. `specs.md`: Defines the technical logic and workout engine behavior.
3. `context.md`: Defines this environment and tech stack.

## 2. ENVIRONMENT & STACK
- **Framework**: React 18+ (initialized with Vite).
- **UI**: Material-UI (MUI) + MUI Icons.
- **Router**: React-Router-DOM (version 6+).
- **Data Source**: A local JSON file located at `/public/routines.json`.
- **Deployment**: Targeted for GitHub Pages (base URL configuration required).

## 3. FILE STRUCTURE
- `/src/App.jsx`: Main router and theme provider.
- `/src/components/WorkoutEngine.jsx`: The core logic and display for the active workout.
- `/src/components/HomeView.jsx`: Day selection screen.
- `/src/components/SummaryView.jsx`: Routine overview before starting.
- `/public/routines.json`: The workout database.

## 4. GITHUB PAGES CONFIGURATION
- The `base` property in `vite.config.js` must match the repository name.
- Use `HashRouter` or configure `BrowserRouter` basename to avoid 404s on page refresh.