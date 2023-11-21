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

const StyledAppBar = styled(AppBar)`
  background-color:  ${(props) => props.theme.palette.background.default};
  padding: 5px 55px;

  @media (max-width: 750px) {
    padding: 5px 5px;
  };

`
const StyledDrawer = styled(Drawer)`
`;

const StyledList = styled(List)`
  width: 400px;

`;

const StyledListItem = styled(ListItem)`
  font-family: Inter;
  span {
    font-size: 2rem;
    padding: 15px;
    color: ${(props) => (props.isActive ? props.theme.palette.primary.main : 'inherit')};
    font-weight: ${(props) => (props.isActive ? '500' : 'inherit')};
  }

`;

const NavButton = styled(Button)`
  margin-right: 18px;
  color: ${(props) => props.theme.palette.text.primary};
  @media (max-width: 750px) {
    display: none; // Hide the button on smaller screens
    margin-right: 0px;
  }
`;

const Logo = styled(Typography)`
  flex-grow: 1; 
  font-size: 1.4rem;
  color: ${(props) => props.theme.palette.text.primary};
  @media (max-width: 750px) {
    color: transparent;
  }

  `


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

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    toggleDrawer(false); // This will close the drawer after navigation
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
    <StyledAppBar position="fixed" elevation={elevated ? 4 : 0}>
      <Toolbar>
        <IconButton size="large" aria-label="open drawer" edge="start" onClick={() => toggleDrawer(true)} color="inherit">
          <AiOutlineMenu style={{ color: theme.palette.text.secondary, fontSize: '2rem' }} />
        </IconButton>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <Logo variant="h6" component="div" >
          FoodieHub
        </Logo>
        <NavButton component={Link} to="/" variant="text">About</NavButton>
        <NavButton component={Link} to="/explore" variant="text">Explore</NavButton>
        {currentUser ? (
          <Box>
            <NavButton component={Link} to="/favorites" variant="text">Favorites</NavButton>
            <NavButton component={Link} to="/myrecipes" variant="text">My Recipes</NavButton>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
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
            <NavButton component={Link} to="/login" variant="text" sx={{}}>Login</NavButton>
            <Button component={Link} to="/register" variant="contained" sx={{}}>Sign Up</Button>
          </>
        )}
      </Toolbar>
      <StyledDrawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <StyledList>
        <StyledListItem button onClick={() => handleNavigation('/')} isActive={location.pathname === '/'}>
            <span>About</span>
          </StyledListItem>
          <StyledListItem button onClick={() => handleNavigation('/explore')} isActive={location.pathname === '/explore'}>
            <span>Explore</span>
          </StyledListItem>
          {currentUser ? (
            <>
          <StyledListItem button onClick={() => handleNavigation('/favorites')} isActive={location.pathname === '/favorites'}>
                <span>Favorites</span>
              </StyledListItem>
              <StyledListItem button onClick={() => handleNavigation('/myrecipes')} isActive={location.pathname === '/myrecipes'}>
                <span>My Recipes</span>
              </StyledListItem>
              <StyledListItem button onClick={() => handleNavigation('/profile')} isActive={location.pathname === '/myprofile'}>
                <span>Profile</span>
              </StyledListItem>
              <StyledListItem button onClick={() => { handleLogout(); toggleDrawer(false); }} >
                <span>Logout</span>
              </StyledListItem>
            </>
          ) : (
            <>
          <StyledListItem button onClick={() => handleNavigation('/login')} isActive={location.pathname === '/login'}>
                <span>Login</span>
              </StyledListItem>
              <StyledListItem button onClick={() => handleNavigation('/register')} isActive={location.pathname === '/register'}>
                <span>Sign Up</span>
              </StyledListItem>
            </>
          )}
        </StyledList>
      </StyledDrawer>
    </StyledAppBar>
  );
}

