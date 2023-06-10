import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AiOutlineMenu } from 'react-icons/ai';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Link } from "react-router-dom";


export default function NavBar() {
  function ElevationScroll({ children }) {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll style={{
        backgroundColor: 'red',
      }}>
        <AppBar position="fixed" sx={{
          background: '#f5f7fa98',
          color: 'black',
          borderBottom: '1px solid lightgrey',
        }}>
          <Toolbar>
            <AiOutlineMenu style={{
              fontSize: '1.5rem',
              marginRight: '15px',
            }} />    
            <Typography variant="h6" component="div" sx={{
              flexGrow: 1,
              fontSize: '1.25rem',
            }}>
              RECIPE FINDER
            </Typography>
            {/* <Button color="inherit">Login</Button>
            <Button variant="contained">Sign Up</Button> */}
            <Button href="/explore" variant="text">Explore</Button>
            <Button href="/recipes" variant="text">My Recipes</Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
