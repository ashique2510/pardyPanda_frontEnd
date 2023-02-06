import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Album() {
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState('');
  const navigate = useNavigate();



  React.useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem('user'));
    if (!loginUser) {
      navigate('/signup');
    }
    setUser(loginUser);
  }, []);



  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/imgData');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function logOut() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{ justifyContent: 'flex-start' }}>
          <Typography marginRight={6} variant="h6" color="inherit" noWrap>
            name: {user.name}
          </Typography>

          <Typography variant="h6" color="inherit" noWrap>
            email: {user.email}
          </Typography>

          <Typography marginLeft={6} variant="h4" color="inherit" noWrap>
            Home Page
          </Typography>

          <Box>
            <Button
              onClick={logOut}
              style={{
                backgroundColor: 'yellow',
                position: 'static',
                marginLeft: '60px',
                textAlign: 'center',
              }}
              size="big"
            >
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <main>
        {/* Hero unit */}
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}></Box>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((item, index) => (
              <Grid
                item
                key={item.id}
                xs={12}
                sm={6}
                md={4}
                style={{
                  gridColumn: index % 2 === 0 ? 'auto/span 2' : 'span 2/auto',
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.download_url}
                    alt="image"
                    style={{ gridRowStart: index % 2 === 0 ? 'even' : 'odd' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
