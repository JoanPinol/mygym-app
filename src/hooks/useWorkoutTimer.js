import { useState, useEffect, useRef } from 'react';

/**
 * Hook that manages interval-based countdown timer
 * Handles start, pause, resume, and cleanup
 * @param {number} initialSeconds - Starting duration in seconds
 * @param {boolean} isActive - Whether timer should be running
 * @param {function} onComplete - Callback when timer reaches 0
 * @returns {object} Timer state and control methods
 */
export const useWorkoutTimer = (initialSeconds, isActive, onComplete) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef(null);

  // Main timer effect
  useEffect(() => {
    if (!isActive || !isRunning) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      return;
    }

    intervalIdRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1;

        // Timer complete
        if (newSeconds <= 0) {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
          setIsRunning(false);
          if (onComplete) {
            onComplete();
          }
          return 0;
        }

        return newSeconds;
      });
    }, 1000); // Decrement every 1 second

    // Cleanup on unmount or dependency change
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isActive, isRunning, onComplete]);

  // Auto-start when initialSeconds changes and isActive is true
  useEffect(() => {
    if (isActive && !isRunning && initialSeconds > 0) {
      setSeconds(initialSeconds);
      setIsRunning(true);
    }
  }, [initialSeconds, isActive]);

  const pause = () => {
    setIsRunning(false);
  };

  const resume = () => {
    setIsRunning(true);
  };

  const stop = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIsRunning(false);
    setSeconds(0);
  };

  return {
    seconds,
    isRunning,
    pause,
    resume,
    stop,
  };
};
