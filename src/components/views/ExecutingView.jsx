import React from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { formatTime } from '../../utils/timeFormatter';

/**
 * ExecutingView Component
 * Displays active exercise (timed or reps)
 * @param {object} exercise - Current exercise data
 * @param {number} timerSeconds - Remaining seconds for timed exercises
 * @param {number} currentIndex - Current exercise index
 * @param {number} totalExercises - Total exercises in queue
 * @param {function} onDone - Callback for reps exercises completion
 */
export const ExecutingView = ({
  exercise,
  timerSeconds,
  currentIndex,
  totalExercises,
  onDone,
}) => {
  const isTimed = exercise?.type === 'timed';
  const progressPercent = totalExercises > 0 ? ((currentIndex + 1) / totalExercises) * 100 : 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh',
        width: '100%',
        backgroundColor: '#121212',
        color: '#fff',
        padding: 2,
      }}
    >
      {/* Top Bar: Exercise Info */}
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' },
            color: '#bbb',
            marginBottom: 1,
          }}
        >
          {currentIndex + 1} of {totalExercises}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 'bold',
            marginBottom: 1,
          }}
        >
          {exercise?.name || 'Exercise'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' },
            color: '#aaa',
          }}
        >
          {exercise?.description || ''}
        </Typography>

        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            marginTop: 2,
            height: 4,
            backgroundColor: '#333',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#00E676',
            },
          }}
        />
      </Box>

      {/* Center Stage: Timer or Goal */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        {isTimed ? (
          // Timed Exercise: Large MM:SS
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '5rem', md: '7rem' },
              fontWeight: 'bold',
              color: '#00E676',
              fontFamily: 'monospace',
              lineHeight: 1,
            }}
          >
            {formatTime(timerSeconds)}
          </Typography>
        ) : (
          // Rep Exercise: Goal Text
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 'bold',
                color: '#00E676',
                marginBottom: 2,
              }}
            >
              {exercise?.goal || 'Complete'}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: '#bbb',
              }}
            >
              {exercise?.description || 'Perform exercise'}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Bottom: Done Button (only for reps) */}
      {!isTimed && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={onDone}
            sx={{
              flex: 1,
              minHeight: '56px',
              fontSize: { xs: '1rem', md: '1.125rem' },
              backgroundColor: '#00E676',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#00c853',
              },
            }}
          >
            Done
          </Button>
        </Box>
      )}
    </Box>
  );
};
