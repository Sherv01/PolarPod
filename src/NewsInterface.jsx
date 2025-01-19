import React, { useState,useEffect } from 'react';
import { Play, Pause, Layout } from 'lucide-react';
import { useLocation,useParams } from 'react-router-dom';
import LoadingScreen from './Loading.jsx';
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

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'capitalize',
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const NewsInterface = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0); // Progress state (0-100)
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('similarities');
  const [loading,setLoading]=useState(true);
  const title = location.state?.title || "Default Title";
  const [viewpoints, setViewpoints]=useState({
    similarities: [],
    perspective1: [],
    perspective2: [],
  })
  const searchQuery= useParams();
  console.log(searchQuery);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Start Fetching (10%)
        setProgress(10);

        // Step 2: Send Request (30%)
        const response = await fetch('/analyze', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ search: searchQuery }),
        });
        setProgress(30);

        // Step 3: Receive Response (60%)
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        setProgress(60);

        // Step 4: Parse Data (90%)
        const result = await response.json();
        setViewpoints({
          similarities: result.similarities || [],
          perspective1: result.perspective1 || [],
          perspective2: result.perspective2 || [],
        });
        console.log('Fetched Data:', result);
        setProgress(90);

        // Step 5: Complete (100%)
        setLoading(false);
        setProgress(100);
      } catch (error) {
        console.error('Fetch Error:', error);
        setError(error.message);
        setProgress(100); // End progress on error
      }
    };
    
    
    fetchData();
  }, [searchQuery]);




  
  // Sample data


  if(loading){
return(
<LoadingScreen/>
);

  }else{
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
              {title}
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={30} sx={{ height: 6, borderRadius: 3 }} />
        </Card>

        {/* Right Side: Perspectives */}
        <Card sx={{ flex: 1, boxShadow: 3}}>
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
                  sx={{
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
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
}
export default NewsInterface;
