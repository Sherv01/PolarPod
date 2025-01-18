import React, { useState } from 'react';
import { Play, Pause, Layout } from 'lucide-react';
import {
  createTheme,
  ThemeProvider,
  styled,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  LinearProgress,
} from '@mui/material';

const Header = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: theme.palette.background.default,
                boxShadow: theme.shadows[3],
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    background: 'linear-gradient(45deg, #abc6ff, #ACA5DB)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                }}
            >
                NewsScraper
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
                {['Home', 'Discovery', 'Team'].map((page) => (
                    <Typography
                        key={page}
                        variant="body1"
                        sx={{
                            color: theme.palette.text.primary,
                            cursor: 'pointer',
                            '&:hover': {
                                color: theme.palette.primary.main,
                            },
                        }}
                        onClick={() => window.location.href = '/' + page.toLowerCase()}
                    >
                        {page}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#abc6ff',
    },
    secondary: {
      main: '#ACA5DB',
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
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'capitalize',
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const NewsInterface = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('similarities');

  // Sample data
  const viewpoints = {
    similarities: [
      'Both sides acknowledge climate change is occurring',
      'Both agree economic impact should be considered',
      'Both want energy security',
    ],
    perspective1: [
      'Emphasizes immediate action needed',
      'Supports stronger regulations',
      'Focuses on environmental impact',
    ],
    perspective2: [
      'Prefers market-based solutions',
      'Concerned about economic costs',
      'Emphasizes technological innovation',
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          gap: 4,
          padding: 4,
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Left Side: Video Player */}
        <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
          <Box
            sx={{
              position: 'relative',
              flexGrow: 1,
              backgroundColor: 'black',
              borderRadius: `${theme.shape.borderRadius}px`,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
                  borderRadius: '50%',
                }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause sx={{ fontSize: 40, color: 'white' }} /> : <Play sx={{ fontSize: 40, color: 'white' }} />}
              </Button>
            </Box>
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '4px 8px',
                borderRadius: `${theme.shape.borderRadius / 2}px`,
              }}
            >
              Climate Change Policy Debate: Understanding Different Perspectives
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={30} sx={{ height: 6, borderRadius: 3 }} />
        </Card>

        {/* Right Side: Perspectives */}
        <Card sx={{ flex: 1, boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                Perspectives Analysis
              </Typography>
              <Layout sx={{ color: theme.palette.text.secondary }} />
            </Box>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              textColor="primary"
              indicatorColor="primary"
              variant="fullWidth"
              sx={{ mb: 3 }}
            >
              {Object.keys(viewpoints).map((key) => (
                <StyledTab
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={key}
                />
              ))}
            </Tabs>
            <Box>
              {viewpoints[activeTab].map((point, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    marginBottom: 2,
                    backgroundColor: theme.palette.background.paper,
                    padding: 2,
                    borderRadius: theme.shape.borderRadius,
                  }}
                >
                  {point}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default NewsInterface;
