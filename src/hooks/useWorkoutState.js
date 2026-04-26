import { useState, useCallback } from 'react';

// State machine constants
export const STATES = {
  SELECT_DAY: 'SELECT_DAY',
  SUMMARY: 'SUMMARY',
  PREPARING: 'PREPARING',
  EXECUTING: 'EXECUTING',
  PAUSED: 'PAUSED',
  FINISHED: 'FINISHED',
};

/**
 * Hook that manages workout state machine transitions
 * Handles queue expansion, current exercise tracking, and state flow
 * @returns {object} Workout state and control methods
 */
export const useWorkoutState = () => {
  const [currentState, setCurrentState] = useState(STATES.SELECT_DAY);
  const [exerciseQueue, setExerciseQueue] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);

  /**
   * Expands a routine by processing blocks and their rounds
   * @param {object} routine - Routine object with blocks array
   * @returns {array} Flattened queue of exercises
   */
  const expandRoutine = useCallback((routine) => {
    const queue = [];
    if (routine.blocks && Array.isArray(routine.blocks)) {
      routine.blocks.forEach((block) => {
        const rounds = block.rounds || 1;
        for (let i = 0; i < rounds; i++) {
          if (block.exercises && Array.isArray(block.exercises)) {
            queue.push(...block.exercises);
          }
        }
      });
    }
    return queue;
  }, []);

  /**
   * Initialize workout with routine
   */
  const initializeWorkout = useCallback((routine, day) => {
    const queue = expandRoutine(routine);
    setExerciseQueue(queue);
    setCurrentExerciseIndex(0);
    setSelectedDay(day);
    setCurrentState(STATES.SUMMARY);
  }, [expandRoutine]);

  /**
   * Start workout (transition from SUMMARY to PREPARING)
   */
  const startWorkout = useCallback(() => {
    if (exerciseQueue.length > 0) {
      setCurrentExerciseIndex(0);
      setCurrentState(STATES.PREPARING);
    }
  }, [exerciseQueue]);

  /**
   * Transition from PREPARING to EXECUTING
   */
  const beginExercise = useCallback(() => {
    setCurrentState(STATES.EXECUTING);
  }, []);

  /**
   * Advance to next exercise
   * If queue exhausted, transition to FINISHED
   */
  const nextExercise = useCallback(() => {
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex >= exerciseQueue.length) {
      setCurrentState(STATES.FINISHED);
    } else {
      setCurrentExerciseIndex(nextIndex);
      setCurrentState(STATES.PREPARING);
    }
  }, [currentExerciseIndex, exerciseQueue.length]);

  /**
   * Pause workout (freeze timer)
   */
  const pauseWorkout = useCallback(() => {
    setCurrentState(STATES.PAUSED);
  }, []);

  /**
   * Resume from pause
   */
  const resumeWorkout = useCallback(() => {
    setCurrentState(STATES.EXECUTING);
  }, []);

  /**
   * Quit workout and return to home
   */
  const quitWorkout = useCallback(() => {
    setCurrentState(STATES.SELECT_DAY);
    setExerciseQueue([]);
    setCurrentExerciseIndex(0);
    setSelectedDay(null);
  }, []);

  /**
   * Finish workout
   */
  const finishWorkout = useCallback(() => {
    setCurrentState(STATES.FINISHED);
  }, []);

  // Get current exercise
  const currentExercise = exerciseQueue[currentExerciseIndex] || null;

  // Calculate progress
  const totalExercises = exerciseQueue.length;
  const progressPercent = totalExercises > 0 ? ((currentExerciseIndex + 1) / totalExercises) * 100 : 0;

  return {
    // State
    currentState,
    currentExercise,
    currentExerciseIndex,
    exerciseQueue,
    selectedDay,
    totalExercises,
    progressPercent,

    // Actions
    initializeWorkout,
    startWorkout,
    beginExercise,
    nextExercise,
    pauseWorkout,
    resumeWorkout,
    quitWorkout,
    finishWorkout,
  };
};
