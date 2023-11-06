import React, { useContext, useState, useEffect } from 'react';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useScrollTrigger } from '@mui/material';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import ThemeToggle from '../Theme/ThemeToggle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';


const StyledDrawer = styled(Drawer)`
  color: /* your desired text color */;
`;

const StyledList = styled(List)`
  width: 400px;
`;

const StyledListItem = styled(ListItem)`
  color: ${(props) => props.theme.palette.text.main};
font-family: Inter;
  span {
    font-size: 2rem;
    padding: 15px;
    color: ${(props) => (props.isActive ? props.theme.palette.primary.main : 'inherit')};
    font-weight: ${(props) => (props.isActive ? '500' : 'inherit')};
  }
`;

const NavButton = styled(Button)`
  &:not(:last-child) {
    margin-right: 16px; // or whatever spacing you prefer
  }
`;


export default function NavBar({ theme, setTheme }) {
  const currentUser = useContext(FirebaseAuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [elevated, setElevated] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      console.error(error);
    });
    navigate('/');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = () => {
    const isScrolling = window.scrollY > 0;
    setElevated(isScrolling);
  };

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar position="fixed" elevation={elevated ? 4 : 0} style={{ backgroundColor: theme.palette.background.default, padding: '5px 55px' }}>
      <Toolbar>
        <IconButton size="large" aria-label="open drawer" edge="start" onClick={() => toggleDrawer(true)} color="inherit">
          <AiOutlineMenu style={{ color: theme.palette.text.secondary, fontSize: '2rem' }} />
        </IconButton>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1.4rem', color: theme.palette.text.primary }}>
          FoodieHub
        </Typography>
        <NavButton component={Link} to="/" variant="text" sx={{ color: theme.palette.text.primary }}>About</NavButton>
        <NavButton component={Link} to="/explore" variant="text" sx={{ color: theme.palette.text.primary }}>Explore</NavButton>
        {currentUser ? (
          <Box>
            <Button component={Link} to="/favorites" variant="text" sx={{ margin: '0 8px', color: theme.palette.text.primary }}>Favorites</Button>
            <Button component={Link} to="/myrecipes" variant="text" sx={{ margin: '0 8px', color: theme.palette.text.primary }}>My Recipes</Button>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit" style={{
              padding: '0px', marginLeft: '10px'
            }}>
              <AccountCircleIcon style={{ color: theme.palette.primary.main, fontSize: '3rem' }} />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <NavButton component={Link} to="/login" variant="text" sx={{ marginRight: '10px', color: theme.palette.text.primary }}>Login</NavButton>
            <NavButton component={Link} to="/register" variant="contained" sx={{ margin: '0 0px' }}>Sign Up</NavButton>
          </>
        )}
      </Toolbar>
      <StyledDrawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <StyledList>
          <StyledListItem button component={Link} to="/" onClick={() => toggleDrawer(false)} isActive={location.pathname === '/'}>
            <span>About</span>
          </StyledListItem>
          <StyledListItem button component={Link} to="/explore" onClick={() => toggleDrawer(false)} isActive={location.pathname === '/explore'} >
            <span>Explore</span>
          </StyledListItem>
          {currentUser ? (
            <>
              <StyledListItem button component={Link} to="/favorites" onClick={() => toggleDrawer(false)} isActive={location.pathname === '/favorites'}>
                <span>Favorites</span>
              </StyledListItem>
              <StyledListItem button component={Link} to="/myrecipes" onClick={() => toggleDrawer(false)} isActive={location.pathname === '/myrecipes'}>
                <span>My Recipes</span>
              </StyledListItem>
              <StyledListItem button component={Link} to="/profile" onClick={() => toggleDrawer(false)} isActive={location.pathname === '/profile'}>
                <span>Profile</span>
              </StyledListItem>
              <StyledListItem button onClick={() => { handleLogout(); toggleDrawer(false);}} >
                <span>Logout</span>
              </StyledListItem>
            </>
          ) : (
            <>
              <StyledListItem button component={Link} to="/login" onClick={() => toggleDrawer(false)} isActive={location.pathname === '/login'}>
                <span>Login</span>
              </StyledListItem>
              <StyledListItem button component={Link} to="/register" onClick={() => toggleDrawer(false)} isActive={location.pathname === '/register'}>
                <span>Sign Up</span>
              </StyledListItem>
            </>
          )}
        </StyledList>
      </StyledDrawer>
    </AppBar>
  );
}

