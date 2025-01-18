import React from 'react';
import { Search, BarChart2, Shield, Globe2 } from 'lucide-react';
import { Box, Typography, Grid, TextField, Button, Card, CardContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom Theme
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
                {['Home', 'About', 'Discovery', 'Contact', 'Team'].map((page) => (
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
                    >
                        {page}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

const Hero = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #abc6ff, #ACA5DB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Uncover Media Bias with AI
      </Typography>
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          mb: 4,
          color: theme.palette.text.secondary,
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        Advanced news analysis platform that helps you understand different perspectives and identify potential bias in media coverage.
      </Typography>
      <SearchBar />
    </Box>
  );
};

const SearchBar = () => {
  return (
    <Box
      sx={{
        maxWidth: '600px',
        mx: 'auto',
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        p: 1,
      }}
    >
      <TextField
        fullWidth
        placeholder="Enter a news article URL or topic..."
        variant="outlined"
        sx={{
          input: { color: theme.palette.text.primary },
          backgroundColor: 'transparent',
          borderRadius: theme.shape.borderRadius,
        }}
      />
      <Button
        variant="contained"
        sx={{
          ml: 1,
          backgroundColor: theme.palette.primary.main,
          borderRadius: theme.shape.borderRadius,
          '&:hover': { backgroundColor: theme.palette.secondary.main },
        }}
      >
        Analyze
      </Button>
    </Box>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        '&:hover': { boxShadow: theme.shadows[6] },
      }}
    >
      <CardContent sx={{ p: 4, textAlign: 'center' }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            mx: 'auto',
            mb: 2,
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={30} color="#003064" />
        </Box>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Features = () => {
  const features = [
    {
      icon: BarChart2,
      title: 'Bias Detection',
      description: 'Our AI analyzes language patterns, source credibility, and contextual factors to identify potential bias in news articles.',
    },
    {
      icon: Shield,
      title: 'Fact Checking',
      description: 'Cross-reference claims with verified sources and trusted databases to ensure accuracy and reliability.',
    },
    {
      icon: Globe2,
      title: 'Global Coverage',
      description: 'Analyze news from multiple sources worldwide to get a comprehensive view of how different outlets cover the same story.',
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        px: { xs: 2, sm: 4, md: 8 }, // Add padding to the left and right
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const CTA = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #abc6ff, #ACA5DB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Start Analyzing News Today
      </Typography>
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          mb: 4,
          color: theme.palette.text.secondary,
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        Join thousands of users who make more informed decisions about their news consumption.
      </Typography>
      <Button
        variant="contained"
        sx={{
          px: 4,
          py: 2,
          fontSize: '1rem',
          fontWeight: 'bold',
          backgroundColor: theme.palette.primary.main,
          borderRadius: theme.shape.borderRadius,
          '&:hover': { backgroundColor: theme.palette.secondary.main },
        }}
      >
        Get Started Free
      </Button>
    </Box>
  );
};



const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Hero />
      <Features />
      <CTA />
    </ThemeProvider>
  );
};

export default LandingPage;
