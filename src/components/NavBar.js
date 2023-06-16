import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../FirebaseAuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AiOutlineMenu } from 'react-icons/ai';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Link } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@mui/material/styles';


export default function NavBar({ theme, setTheme }) {
  const currentUser = useContext(FirebaseAuthContext);


  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      console.error(error);
    });
  };

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
      <ElevationScroll>
        <AppBar position="fixed" sx={{
          background: theme.palette.background.default,
          // borderBottom: '1px solid lightgrey',
          color: theme.palette.text.primary,
          padding: '0px 20px'
        }}>
          <Toolbar>
            <AiOutlineMenu style={{
              fontSize: '1.75rem',
              margin: '0',
              marginRight: '20px',
              color: theme.palette.text.primary,
            }} />
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <Typography variant="h6" component="div" sx={{
              flexGrow: 1,
              fontSize: '1.4rem',
              color: theme.palette.text.primary,
            }}>
              FoodieHub

            </Typography>
            <Button href="/" variant="text" sx={{
              margin: '0 8px',
              color: theme.palette.text.primary,
            }}>Home</Button>
            <Button href="/explore" variant="text" sx={{
              margin: '0 8px', 
              color: theme.palette.text.primary,
            }}>Explore</Button>
            {currentUser ? (
              <>
                <Typography variant="subtitle1" sx={{ margin: '0 0px' }}>Welcome, {currentUser.email}</Typography>
                <Button onClick={handleLogout} variant="text" sx={{ margin: '0 0px' }}>Logout</Button>
              </>
            ) : (
              <>
                <Button href="/login" variant="text" sx={{
                  margin: '0 0px', 
                  color: theme.palette.text.primary,
                }}>Login</Button>
                <Button href="/myrecipes" variant="" sx={{ margin: '0 0px' }}>My Recipes</Button>
                <Button href="/register" variant="contained" sx={{ margin: '0 0px' }}>Sign Up</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}


// Good color:
// rgb(245 247 250)
