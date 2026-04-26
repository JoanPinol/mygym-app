import React from 'react';
import { Box, Button, Typography, Container, Card, CardContent } from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';

/**
 * HomeView Component (SELECT_DAY state)
 * Displays day selection buttons for users to pick their workout routine
 * @param {function} onSelectDay - Callback when day is selected (dayNumber: 1-4)
 * @param {array} routines - Array of routine objects from routines.json
 */
function HomeView({ onSelectDay, routines }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        {/* Header */}
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <FitnessCenter sx={{ fontSize: 48, color: '#00E676' }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: 1,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            MyGym
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#aaa',
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            Select your workout day
          </Typography>
        </Box>

        {/* Day Selection Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {routines.map((routine, index) => {
            const dayNumber = index + 1;
            return (
              <Card
                key={routine.id}
                sx={{
                  backgroundColor: '#1e1e1e',
                  border: '2px solid #333',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#00E676',
                    boxShadow: '0 0 16px rgba(0, 230, 118, 0.3)',
                  },
                }}
                onClick={() => onSelectDay(dayNumber)}
              >
                <CardContent sx={{ padding: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: '#00E676',
                          fontSize: { xs: '1rem', md: '1.125rem' },
                        }}
                      >
                        {routine.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#aaa',
                          marginTop: 0.5,
                          fontSize: { xs: '0.75rem', md: '0.875rem' },
                        }}
                      >
                        {routine.blocks?.length || 0} blocks
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#00E676',
                        fontWeight: 'bold',
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                      }}
                    >
                      →
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Footer Info */}
        <Typography
          variant="caption"
          sx={{
            color: '#666',
            textAlign: 'center',
            marginTop: 4,
            display: 'block',
            fontSize: { xs: '0.7rem', md: '0.75rem' },
          }}
        >
          Push your limits. Crush your goals.
        </Typography>
      </Container>
    </Box>
  );
}

export default HomeView;
