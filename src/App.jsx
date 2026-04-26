import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomeView from './components/HomeView';
import SummaryView from './components/SummaryView';
import { WorkoutEngine } from './components/WorkoutEngine';

/**
 * Global dark theme configuration
 * Gym-style: Dark background with green accent
 */
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#121212',
    },
    primary: {
      main: '#00E676',
    },
    secondary: {
      main: '#00E676',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

/**
 * Main App Component with State Management & Routing
 * Flow: HomeView (SELECT_DAY) → SummaryView (SUMMARY) → WorkoutEngine (PREPARING/EXECUTING) → HomeView (FINISHED)
 */
function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const navigate = useNavigate();

  /**
   * Load routines from JSON on mount
   */
  useEffect(() => {
    const loadRoutines = async () => {
      try {
        const response = await fetch('/mygym-app/routines.json');
        const data = await response.json();
        setRoutines(data.routines || []);
      } catch (error) {
        console.error('Failed to load routines:', error);
      }
    };
    loadRoutines();
  }, []);

  /**
   * Handle day selection → Navigate to Summary
   */
  const handleSelectDay = (dayNumber) => {
    const dayId = `day-${dayNumber}`;
    const routine = routines.find((r) => r.id === dayId);
    if (routine) {
      setSelectedDay(dayNumber);
      setSelectedRoutine(routine);
      navigate('/summary');
    }
  };

  /**
   * Handle "Start Workout" from Summary → Navigate to Workout Engine
   */
  const handleStartWorkout = () => {
    navigate('/workout');
  };

  /**
   * Handle workout completion → Return to Home
   */
  const handleWorkoutFinish = () => {
    setSelectedDay(null);
    setSelectedRoutine(null);
    navigate('/');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        {/* Home: Day Selection */}
        <Route
          path="/"
          element={
            <HomeView
              onSelectDay={handleSelectDay}
              routines={routines}
            />
          }
        />

        {/* Summary: Routine Preview */}
        <Route
          path="/summary"
          element={
            selectedRoutine ? (
              <SummaryView
                routine={selectedRoutine}
                day={selectedDay}
                onStart={handleStartWorkout}
                onBack={() => navigate('/')}
              />
            ) : (
              <div>Loading...</div>
            )
          }
        />

        {/* Workout: Active Engine */}
        <Route
          path="/workout"
          element={
            selectedRoutine ? (
              <WorkoutEngine
                routine={selectedRoutine}
                selectedDay={selectedDay}
                onFinish={handleWorkoutFinish}
              />
            ) : (
              <div>Loading...</div>
            )
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

/**
 * Wrapper to provide Router context to App
 */
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
