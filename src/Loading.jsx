import React from 'react';
import { Loader2 } from 'lucide-react';
import { ThemeProvider, createTheme, Box, Typography, LinearProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
  palette: {
    primary: {
      main: '#abc6ff',
    },
    background: {
      default: '#1a2129',
      paper: '#262A33',
    },
    text: {
      primary: '#C0C6D7',
      secondary: '#8D96A8',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const LoadingScreen = ({ progress = 0, status = 'Loading data...', onCancel }) => {
    const navigate = useNavigate();
    function handleClick(){
        navigate(-1);
    }
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 4,
            borderRadius: 3,
            boxShadow: 3,
            maxWidth: 400,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Animated spinner */}
          <Loader2
            className="animate-spin"
            style={{ fontSize: '48px', color: theme.palette.primary.main }}
          />
          {/* Status message */}
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              marginTop: 2,
            }}
          >
            {status}
          </Typography>
          {/* Progress bar */}
          <Box sx={{ width: '100%', marginTop: 3 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 2,
                backgroundColor: theme.palette.text.secondary,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            />
          </Box>
          {/* Progress percentage */}
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, marginTop: 1 }}
          >
            {progress}% complete
          </Typography>
          {/* Cancel button */}
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
              borderRadius: '50%',
              padding: '8px 16px',
              color: theme.palette.primary.main,
            }}
            onClick={handleClick}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoadingScreen;
