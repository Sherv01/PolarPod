import React from 'react';
import { Loader2 } from 'lucide-react';
import { ThemeProvider, createTheme, Box, Typography, LinearProgress } from '@mui/material';

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

const LoadingScreen = ({ progress = 0, status = 'Scraping data...' }) => {
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
            </Box>
        </Box>
    </ThemeProvider>
);
};

export default LoadingScreen;
