import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';

/**
 * PausedView Component
 * Displays overlay menu during pause with resume/quit options
 * @param {function} onResume - Callback to resume workout
 * @param {function} onQuit - Callback to quit workout
 */
export const PausedView = ({ onResume, onQuit }) => {
  return (
    <Modal open={true} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          backgroundColor: 'rgba(18, 18, 18, 0.95)',
          borderRadius: 2,
          padding: 3,
          textAlign: 'center',
          minWidth: '80vw',
          maxWidth: 400,
          border: '2px solid #00E676',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#fff',
            marginBottom: 3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 'bold',
          }}
        >
          Paused
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Resume Button */}
          <Button
            variant="contained"
            onClick={onResume}
            sx={{
              minHeight: '56px',
              fontSize: '1rem',
              backgroundColor: '#00E676',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#00c853',
              },
            }}
          >
            Resume
          </Button>

          {/* Quit Button */}
          <Button
            variant="outlined"
            onClick={onQuit}
            sx={{
              minHeight: '56px',
              fontSize: '1rem',
              color: '#ff5252',
              borderColor: '#ff5252',
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#ff5252',
                backgroundColor: 'rgba(255, 82, 82, 0.1)',
              },
            }}
          >
            Quit Workout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
