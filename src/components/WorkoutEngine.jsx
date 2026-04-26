import React, { useEffect } from 'react';
import { Box, Button, Fab } from '@mui/material';
import { PauseCircle } from '@mui/icons-material';
import { useWorkoutState, STATES } from '../hooks/useWorkoutState';
import { useWorkoutTimer } from '../hooks/useWorkoutTimer';
import { PreparingView } from './views/PreparingView';
import { ExecutingView } from './views/ExecutingView';
import { PausedView } from './views/PausedView';

/**
 * WorkoutEngine Component
 * Main orchestrator for workout state machine and timer management
 * Handles transitions between PREPARING, EXECUTING, PAUSED, and FINISHED states
 *
 * @param {object} routine - Routine object from routines.json
 * @param {number} selectedDay - Selected day (1-4)
 * @param {function} onFinish - Callback when workout completes
 */
export const WorkoutEngine = ({ routine, selectedDay, onFinish }) => {
  const {
    currentState,
    currentExercise,
    currentExerciseIndex,
    totalExercises,
    initializeWorkout,
    startWorkout,
    beginExercise,
    nextExercise,
    pauseWorkout,
    resumeWorkout,
    quitWorkout,
  } = useWorkoutState();

  // Determine timer duration based on exercise type
  const getExerciseDuration = () => {
    if (!currentExercise) return 0;
    if (currentExercise.type === 'timed') {
      return currentExercise.duration || 30;
    }
    // For reps, use a placeholder (timer won't be shown)
    return 60;
  };

  // Timer for PREPARING state (5 seconds)
  const preparingTimer = useWorkoutTimer(
    5,
    currentState === STATES.PREPARING,
    () => {
      // When PREPARING countdown reaches 0, transition to EXECUTING
      beginExercise();
    }
  );

  // Timer for EXECUTING state (exercise-specific duration)
  const exercisingTimer = useWorkoutTimer(
    getExerciseDuration(),
    currentState === STATES.EXECUTING && currentExercise?.type === 'timed',
    () => {
      // When exercise timer reaches 0, advance to next exercise
      nextExercise();
    }
  );

  // Initialize workout on mount
  useEffect(() => {
    if (routine && selectedDay && currentState === STATES.SELECT_DAY) {
      initializeWorkout(routine, selectedDay);
    }
  }, [routine, selectedDay, currentState, initializeWorkout]);

  // Automatically begin workout once initialized to SUMMARY
  useEffect(() => {
    if (currentState === STATES.SUMMARY && totalExercises > 0) {
      startWorkout();
    }
  }, [currentState, totalExercises, startWorkout]);

  // Handle FINISHED state
  useEffect(() => {
    if (currentState === STATES.FINISHED && onFinish) {
      onFinish();
    }
  }, [currentState, onFinish]);

  // Handle pause
  const handlePause = () => {
    preparingTimer.pause();
    exercisingTimer.pause();
    pauseWorkout();
  };

  // Handle resume
  const handleResume = () => {
    preparingTimer.resume();
    exercisingTimer.resume();
    resumeWorkout();
  };

  // Handle quit
  const handleQuit = () => {
    preparingTimer.stop();
    exercisingTimer.stop();
    quitWorkout();
    if (onFinish) {
      onFinish();
    }
  };

  // Handle "Done" button on reps exercises
  const handleExerciseDone = () => {
    exercisingTimer.stop();
    nextExercise();
  };

  // Render current state
  const renderCurrentView = () => {
    switch (currentState) {
      case STATES.PREPARING:
        return (
          <PreparingView
            seconds={preparingTimer.seconds}
            exercise={currentExercise}
          />
        );

      case STATES.EXECUTING:
        return (
          <ExecutingView
            exercise={currentExercise}
            timerSeconds={exercisingTimer.seconds}
            currentIndex={currentExerciseIndex}
            totalExercises={totalExercises}
            onDone={handleExerciseDone}
          />
        );

      case STATES.PAUSED:
        return (
          <PausedView
            onResume={handleResume}
            onQuit={handleQuit}
          />
        );

      case STATES.FINISHED:
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              backgroundColor: '#121212',
              color: '#fff',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <h1 style={{ color: '#00E676', marginBottom: 20 }}>Workout Complete!</h1>
              <Button
                variant="contained"
                onClick={handleQuit}
                sx={{
                  minHeight: '56px',
                  fontSize: '1rem',
                  backgroundColor: '#00E676',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              >
                Return Home
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      {/* Main View */}
      {renderCurrentView()}

      {/* Pause Button - Always visible (except in PAUSED and FINISHED states) */}
      {(currentState === STATES.PREPARING ||
        currentState === STATES.EXECUTING) && (
        <Fab
          onClick={handlePause}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: '#00E676',
            color: '#000',
            '&:hover': {
              backgroundColor: '#00c853',
            },
            width: { xs: '56px', md: '64px' },
            height: { xs: '56px', md: '64px' },
            zIndex: 10,
          }}
        >
          <PauseCircle sx={{ fontSize: { xs: '32px', md: '40px' } }} />
        </Fab>
      )}

      {/* Paused Overlay */}
      {currentState === STATES.PAUSED && (
        <PausedView
          onResume={handleResume}
          onQuit={handleQuit}
        />
      )}
    </Box>
  );
};
