import React, { useState,useEffect } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
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
                    cursor: 'pointer'
                }}
                onClick={() => window.location.href = '/home'}
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

const StyledSearch = styled(TextField)(({ theme }) => ({
    backgroundColor: "#525E76",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    '& .MuiInputBase-root': {
      paddingLeft: theme.spacing(4),
    },
    '& .MuiInputBase-input::placeholder': {
      color: theme.palette.background.paper, // Replace with your desired color
      opacity: 1, // Ensures the color is fully visible
    },
  }));

const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Sample news data - would come from API in real app
  const [newsArticles, setNewsArticles] = useState([]);
  
  const handleKeyPress = (e)=>{
    if(event.key == "Enter"){
      navigate(`/analysis/${searchQuery}`);
    }
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/items'); // Replace with your API endpoint
        const data = await response.json();

        // Map scraped data into the expected format
        const formattedArticles = data.map((article, index) => ({
          id: index + 1,
          title: article.title || "Untitled Article",
          category: "General", // Set a default or add categories in scraping logic
          readTime: `${Math.ceil(Math.random() * 6)} min`, // Generate random read times
          trending: Math.random() > 0.5, // Randomly mark as trending
          image: article.image_url || "https://placehold.co/600x400",
          isLarge: index === 0, // First article as featured
        }));

        setNewsArticles(formattedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <Header />
      <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: '#003064', p: 4 }}>
        {/* Search Section */}
        <Box maxWidth="md" mx="auto" mb={4}>
          <StyledSearch
          onKeyPress={handleKeyPress}
            variant="outlined"
            placeholder="Search for topics, articles, or perspectives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search style={{ marginRight: '8px', color: theme.palette.background.paper }} />
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
                <Card sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', boxShadow: 3 }} onClick={() => navigate(`/analysis`, { state: { title: article.title } })} >
                  <CardMedia
                    component="img"
                    height="300"
                    image={article.image}
                    alt={article.title}
                  />
                  <CardContent sx={{ position: 'relative', backgroundColor: theme.palette.primary.main, color: '#003064' }} >
                    <Box sx = {{ display: 'flex', gap: 1 }}>
                    <Chip label={article.category} sx={{ backgroundColor: theme.palette.secondary.main, color: '#003064' }} />
                    <Chip label={"Featured"} sx={{ backgroundColor: theme.palette.secondary.main, color: '#003064' }} />
                    </Box>
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
                <Card sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', boxShadow: 3 }} onClick={() => navigate(`/analysis`, { state: { title: article.title } })} >
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