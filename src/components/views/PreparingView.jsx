import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * PreparingView Component
 * Displays 5-second countdown before exercise starts
 * @param {number} seconds - Remaining seconds (0-5)
 * @param {object} exercise - Current exercise data
 */
export const PreparingView = ({ seconds, exercise }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#121212',
        color: '#fff',
        padding: 2,
      }}
    >
      {/* Exercise Name */}
      <Typography
        variant="h5"
        sx={{
          marginBottom: 4,
          textAlign: 'center',
          fontSize: { xs: '1.25rem', md: '1.75rem' },
        }}
      >
        {exercise?.name || 'Get Ready'}
      </Typography>

      {/* Large Countdown Number */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '4rem', md: '6rem' },
          fontWeight: 'bold',
          color: '#00E676',
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {seconds}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="h6"
        sx={{
          color: '#bbb',
          fontSize: { xs: '1rem', md: '1.25rem' },
        }}
      >
        Get ready to begin
      </Typography>
    </Box>
  );
};
