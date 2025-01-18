import React, { useState } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Box,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
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

const StyledSearch = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  '& .MuiInputBase-root': {
    paddingLeft: theme.spacing(4),
  },
}));

const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample news data - would come from API in real app
  const newsArticles = [
    {
      id: 1,
      title: "Global Climate Summit Reaches Historic Agreement",
      category: "Politics",
      readTime: "5 min",
      trending: true,
      image: "https://placehold.co/800x400",
      isLarge: true,
    },
    {
      id: 2,
      title: "Tech Giants Announce New AI Collaboration",
      category: "Technology",
      readTime: "3 min",
      trending: true,
      image: "https://placehold.co/600x400",
    },
    {
      id: 3,
      title: "Space Tourism: First Commercial Flight Launches",
      category: "Science",
      readTime: "4 min",
      trending: false,
      image: "https://placehold.co/600x400",
    },
    {
      id: 4,
      title: "Revolutionary Cancer Treatment Shows Promise",
      category: "Health",
      readTime: "6 min",
      trending: true,
      image: "https://placehold.co/600x400",
    },
    {
      id: 5,
      title: "Global Markets React to Economic Policy Shifts",
      category: "Finance",
      readTime: "4 min",
      trending: false,
      image: "https://placehold.co/600x400",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
    <Header />
      <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: '#003064', p: 4 }}>
        {/* Search Section */}
        <Box maxWidth="md" mx="auto" mb={4}>
          <StyledSearch
            variant="outlined"
            placeholder="Search for topics, articles, or perspectives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search style={{ marginRight: '8px', color: theme.palette.text.secondary }} />
              ),
            }}
            fullWidth
          />
        </Box>

        {/* News Grid */}
        <Box maxWidth="lg" mx="auto">
          <Grid container spacing={3}>
            {/* Featured Article (Large Tile) */}
            {newsArticles.filter((article) => article.isLarge).map((article) => (
              <Grid key={article.id} item xs={12} md={8} onClick={() => window.location.href = '/analysis'} style={{ cursor: 'pointer' }} >
                <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3 }} >
                  <CardMedia
                    component="img"
                    height="300"
                    image={article.image}
                    alt={article.title}
                  />
                  <CardContent sx={{ position: 'relative', backgroundColor: theme.palette.primary.main, color: '#003064' }} >
                    <Chip label={article.category} sx={{ backgroundColor: theme.palette.secondary.main, color: '#003064' }} />
                    <Typography variant="h6" component="h2" sx={{ mt: 1 }}>
                      {article.title}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <Clock style={{ marginRight: 4 }} />
                      <Typography variant="body2">{article.readTime}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Regular Articles (Smaller Tiles) */}
            {newsArticles.filter((article) => !article.isLarge).map((article) => (
              <Grid key={article.id} item xs={12} md={4} >
                <Card sx={{ boxShadow: 1, '&:hover': { boxShadow: 4 }}} onClick={() => window.location.href = '/analysis'} style={{ cursor: 'pointer' }} >
                  <CardMedia
                    component="img"
                    height="150"
                    image={article.image}
                    alt={article.title}
                  />
                  <CardContent sx = {{ backgroundColor: '#262A33' }}>
                    <Chip label={article.category} color="primary" />
                    <Typography component="h3" sx={{ mt: 1}}>
                      {article.title}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <Clock style={{ marginRight: 4, color: theme.palette.text.secondary }} />
                      <Typography variant="body2" color="text.secondary">
                        {article.readTime}
                      </Typography>
                    </Box>
                    {article.trending && (
                      <Box display="flex" alignItems="center" mt={1} color={theme.palette.secondary.main}>
                        <TrendingUp style={{ marginRight: 4 }} />
                        <Typography variant="body2">Trending</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DiscoveryPage;
