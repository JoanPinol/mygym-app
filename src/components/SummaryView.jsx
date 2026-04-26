import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import { ArrowBack, PlayArrow, CheckCircle } from '@mui/icons-material';

/**
 * SummaryView Component (SUMMARY state)
 * Displays routine details, exercise list, and equipment needed
 * @param {object} routine - Routine object from routines.json
 * @param {number} day - Selected day number (1-4)
 * @param {function} onStart - Callback to start workout
 * @param {function} onBack - Callback to return to home
 */
function SummaryView({ routine, day, onStart, onBack }) {
  // Extract all exercises and equipment
  const exercises = [];
  const equipmentSet = new Set();

  routine.blocks?.forEach((block) => {
    block.exercises?.forEach((exercise) => {
      exercises.push(exercise);
      if (exercise.equipment && exercise.equipment !== 'None') {
        equipmentSet.add(exercise.equipment);
      }
    });
  });

  const equipment = Array.from(equipmentSet);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#fff',
        paddingY: 2,
      }}
    >
      <Container maxWidth="md">
        {/* Header with Back Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{
              color: '#00E676',
              fontSize: { xs: '0.875rem', md: '1rem' },
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0, 230, 118, 0.1)',
              },
            }}
          >
            Back
          </Button>
        </Box>

        {/* Routine Title */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              marginBottom: 1,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {routine.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#aaa',
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            {exercises.length} total exercises
          </Typography>
        </Box>

        {/* Equipment Section */}
        {equipment.length > 0 && (
          <Card
            sx={{
              backgroundColor: '#1e1e1e',
              border: '1px solid #333',
              marginBottom: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  marginBottom: 2,
                  color: '#00E676',
                  fontSize: { xs: '1rem', md: '1.125rem' },
                }}
              >
                Equipment Needed
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {equipment.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    sx={{
                      backgroundColor: '#2a2a2a',
                      color: '#00E676',
                      borderColor: '#00E676',
                      border: '1px solid',
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Exercise List */}
        <Card
          sx={{
            backgroundColor: '#1e1e1e',
            border: '1px solid #333',
            marginBottom: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: 2,
                color: '#00E676',
                fontSize: { xs: '1rem', md: '1.125rem' },
              }}
            >
              Exercise Breakdown
            </Typography>
            <List sx={{ padding: 0 }}>
              {exercises.map((exercise, index) => (
                <ListItem
                  key={`${exercise.id}-${index}`}
                  sx={{
                    paddingY: 1.5,
                    paddingX: 0,
                    borderBottom: index < exercises.length - 1 ? '1px solid #333' : 'none',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <ListItemIcon sx={{ minWidth: 32, color: '#00E676' }}>
                      <CheckCircle sx={{ fontSize: '1.25rem' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: { xs: '0.95rem', md: '1.025rem' },
                          }}
                        >
                          {exercise.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ marginTop: 0.5 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#aaa',
                              fontSize: { xs: '0.75rem', md: '0.875rem' },
                              marginBottom: 0.5,
                            }}
                          >
                            {exercise.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                              label={exercise.goal}
                              size="small"
                              sx={{
                                backgroundColor: '#2a2a2a',
                                color: '#fff',
                                fontSize: { xs: '0.65rem', md: '0.75rem' },
                                height: '24px',
                              }}
                            />
                            {exercise.equipment && exercise.equipment !== 'None' && (
                              <Chip
                                label={`📦 ${exercise.equipment}`}
                                size="small"
                                sx={{
                                  backgroundColor: '#2a2a2a',
                                  color: '#bbb',
                                  fontSize: { xs: '0.65rem', md: '0.75rem' },
                                  height: '24px',
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      }
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            marginBottom: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={onStart}
            startIcon={<PlayArrow />}
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
            Start Workout
          </Button>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              flex: 1,
              minHeight: '56px',
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: '#00E676',
              borderColor: '#00E676',
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#00E676',
                backgroundColor: 'rgba(0, 230, 118, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SummaryView;
