

// import React, { useContext, useState, useEffect } from 'react';
// import { FirebaseAuthContext } from '../FirebaseAuthContext';
// import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useScrollTrigger } from '@mui/material';
// import { AiOutlineMenu } from 'react-icons/ai';
// import { Link, useNavigate } from 'react-router-dom';
// import { getAuth, signOut } from 'firebase/auth';
// import ThemeToggle from './ThemeToggle';
// import { useTheme } from '@mui/material/styles';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// export default function NavBar({ theme, setTheme }) {
//   const currentUser = useContext(FirebaseAuthContext);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [elevated, setElevated] = useState(false);
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     const auth = getAuth();
//     signOut(auth).catch((error) => {
//       console.error(error);
//     });
//     navigate('/')
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleScroll = () => {
//     const isScrolling = window.scrollY > 0;
//     setElevated(isScrolling);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <AppBar position="fixed" elevation={elevated ? 4 : 0} style={{
//       backgroundColor: theme.palette.background.default,
//       padding: '5px 55px'

//     }}>
//       <Toolbar>
//         <IconButton
//           size="large"
//           aria-label="open drawer"
//           edge="start"
//           onClick={handleMenu}
//           color="inherit"

//         >
//           <AiOutlineMenu style={{
//             color: theme.palette.text.secondary,
//             fontSize: '2rem'
//           }} />
//         </IconButton>
//         <ThemeToggle theme={theme} setTheme={setTheme} />
//         <Typography variant="h6" component="div" sx={{
//           flexGrow: 1,
//           fontSize: '1.4rem',
//           color: theme.palette.text.primary,
//         }}>
//           FoodieHub
//         </Typography>
//         <Button href="/" variant="text" sx={{
//           margin: '0 8px',
//           color: theme.palette.text.primary,
//         }}>Home</Button>
//         <Button href="/explore" variant="text" sx={{
//           margin: '0 8px',
//           color: theme.palette.text.primary,
//         }}>Explore</Button>
//         {currentUser ? (
//           <Box>
//             <Button href="/favorites" variant="text" sx={{
//               margin: '0 8px',
//               color: theme.palette.text.primary,
//             }}>Favorites</Button>
//             <Button href="/myrecipes" variant="text" sx={{
//               margin: '0 8px',
//               color: theme.palette.text.primary,
//             }}>My Recipes</Button>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleMenu}
//               color="inherit"
//               style={{
//                 padding: '0px',
//                 marginLeft: '10px'
//               }}
//             >
//               <AccountCircleIcon style={{
//                 color: theme.palette.primary.main,
//                 fontSize: '3rem',
//               }} />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorEl}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </Box>
//         ) : (
//           <>
//             <Button href="/login" variant="text" sx={{
//               marginRight: '10px',
//               color: theme.palette.text.primary,
//             }}>Login</Button>
//             <Button href="/register" variant="contained" sx={{ margin: '0 0px' }}>Sign Up</Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }




import React, { useContext, useState, useEffect } from 'react';
import { FirebaseAuthContext } from '../FirebaseAuthContext';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useScrollTrigger } from '@mui/material';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@mui/material/styles';
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

  span {
    font-size: 2rem;
    padding: 10px;
    color: ${(props) => (props.isActive ? props.theme.palette.primary.main : 'inherit')};
    font-weight: ${(props) => (props.isActive ? '500' : 'inherit')};
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
        <Button href="/" variant="text" sx={{ margin: '0 8px', color: theme.palette.text.primary }}>About</Button>
        <Button href="/explore" variant="text" sx={{ margin: '0 8px', color: theme.palette.text.primary }}>Explore</Button>
        {currentUser ? (
          <Box>
            <Button href="/favorites" variant="text" sx={{ margin: '0 8px', color: theme.palette.text.primary }}>Favorites</Button>
            <Button href="/myrecipes" variant="text" sx={{ margin: '0 8px', color: theme.palette.text.primary }}>My Recipes</Button>
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
            <Button href="/login" variant="text" sx={{ marginRight: '10px', color: theme.palette.text.primary }}>Login</Button>
            <Button href="/register" variant="contained" sx={{ margin: '0 0px' }}>Sign Up</Button>
          </>
        )}
      </Toolbar>
      <StyledDrawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <StyledList>
          <StyledListItem button component={Link} to="/" onClick={() => toggleDrawer(false)} isActive={location.pathname === '/'}
>
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



// import React, { useContext, useState, useEffect } from 'react';
// import { FirebaseAuthContext } from '../FirebaseAuthContext';
// import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useScrollTrigger } from '@mui/material';
// import { AiOutlineMenu } from 'react-icons/ai';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { getAuth, signOut } from 'firebase/auth';
// import ThemeToggle from './ThemeToggle';
// import { useTheme } from '@mui/material/styles';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { styled } from '@mui/system';
// import { Drawer, List, ListItem, ListItemText } from '@mui/material';

// const StyledDrawer = styled(Drawer)`
//   color: /* your desired text color */;
// `;

// const StyledList = styled(List)`
//   width: 400px;
// `;

// const StyledListItem = styled(ListItem)`
//   color: ${(props) => props.theme.palette.text.main};

//   span {
//     font-size: 2rem;
//     padding: 10px;
//     // text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
//     color: ${(props) => (props.isActive ? props.theme.palette.primary.main : 'inherit')};
//     font-weight: ${(props) => (props.isActive ? '500' : 'inherit')};

//   }
// `;

// export default function NavBar({ theme, setTheme }) {
//   const currentUser = useContext(FirebaseAuthContext);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [elevated, setElevated] = useState(false);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeButton, setActiveButton] = useState('/');


//   const handleLogout = () => {
//     const auth = getAuth();
//     signOut(auth).catch((error) => {
//       console.error(error);
//     });
//     navigate('/');
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleScroll = () => {
//     const isScrolling = window.scrollY > 0;
//     setElevated(isScrolling);
//   };

//   const toggleDrawer = (open) => {
//     setOpenDrawer(open);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <AppBar position="fixed" elevation={elevated ? 4 : 0} style={{ backgroundColor: theme.palette.background.default, padding: '5px 55px' }}>
//       <Toolbar>
//         <IconButton size="large" aria-label="open drawer" edge="start" onClick={() => toggleDrawer(true)} color="inherit">
//           <AiOutlineMenu style={{ color: theme.palette.text.secondary, fontSize: '2rem' }} />
//         </IconButton>
//         <ThemeToggle theme={theme} setTheme={setTheme} />
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1.4rem', color: theme.palette.text.primary }}>
//           FoodieHub
//         </Typography>
//         <Button
//           component={Link}
//           to="/"
//           variant="text"
//           sx={{ margin: '0 8px', color: theme.palette.text.primary }}
//           underline={location.pathname === '/' ? 'always' : 'none'}

//         >
//           Home
//         </Button>
//         <Button
//           component={Link}
//           to="/explore"
//           variant="text"
//           sx={{ margin: '0 8px', color: theme.palette.text.primary }}
//           underline={location.pathname === '/explore' ? 'always' : 'none'}
//           color={location.pathname === '/explore' ? 'primary' : 'inherit'}
//           isActive={location.pathname === '/explore'}
//         >
//           Explore
//         </Button>
//         {currentUser ? (
//           <Box>
//             <Button
//               component={Link}
//               to="/favorites"
//               variant="text"
//               sx={{ margin: '0 8px', color: theme.palette.text.primary }}
//             >
//               Favorites
//             </Button>
//             <Button
//               component={Link}
//               to="/myrecipes"
//               variant="text"
//               sx={{ margin: '0 8px', color: theme.palette.text.primary }}
//             >
//               My Recipes
//             </Button>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleMenu}
//               color="inherit"
//               style={{
//                 padding: '0px',
//                 marginLeft: '10px',
//               }}
//             >
//               <AccountCircleIcon style={{ color: theme.palette.primary.main, fontSize: '3rem' }} />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorEl}
//               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//               keepMounted
//               transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem component={Link} to="/profile" onClick={handleClose}>
//                 Profile
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </Box>
//         ) : (
//           <>
//             <Button
//               component={Link}
//               to="/login"
//               variant="text"
//               sx={{ marginRight: '10px', color: theme.palette.text.primary }}
//               underline={location.pathname === '/login' ? 'always' : 'none'}
//             >
//               Login
//             </Button>
//             <Button
//               component={Link}
//               to="/register"
//               variant="contained"
//               sx={{ margin: '0 0px' }}
//             >
//               Sign Up
//             </Button>
//           </>
//         )}
//       </Toolbar>
//       <StyledDrawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
//         <StyledList>
//           <StyledListItem
//             button
//             component={Link}
//             to="/"
//             onClick={() => toggleDrawer(false)}
//             isActive={location.pathname === '/'}
//           >
//             <span>Home</span>
//           </StyledListItem>
//           <StyledListItem
//             button
//             component={Link}
//             to="/explore"
//             onClick={() => toggleDrawer(false)}
//             isActive={location.pathname === '/explore'}
//           >
//             <span>Explore</span>
//           </StyledListItem>
//           {currentUser ? (
//             <>
//               <StyledListItem
//                 button
//                 component={Link}
//                 to="/favorites"
//                 onClick={() => toggleDrawer(false)}
//                 isActive={location.pathname === '/favorites'}
//               >
//                 <span>Favorites</span>
//               </StyledListItem>
//               <StyledListItem
//                 button
//                 component={Link}
//                 to="/myrecipes"
//                 onClick={() => toggleDrawer(false)}
//                 isActive={location.pathname === '/myrecipes'}
//               >
//                 <span>My Recipes</span>
//               </StyledListItem>
//               <StyledListItem
//                 button
//                 component={Link}
//                 to="/profile"
//                 onClick={() => toggleDrawer(false)}
//                 isActive={location.pathname === '/profile'}
//               >
//                 <span>Profile</span>
//               </StyledListItem>
//               <StyledListItem
//                 button
//                 onClick={() => {
//                   handleLogout();
//                   toggleDrawer(false);
//                 }}
//               >
//                 <span>Logout</span>
//               </StyledListItem>
//             </>
//           ) : (
//             <>
//               <StyledListItem
//                 button
//                 component={Link}
//                 to="/login"
//                 onClick={() => toggleDrawer(false)}
//                 isActive={location.pathname === '/login'}
//               >
//                 <span>Login</span>
//               </StyledListItem>
//               <StyledListItem
//                 button
//                 component={Link}
//                 to="/register"
//                 onClick={() => toggleDrawer(false)}
//                 isActive={location.pathname === '/register'}
//               >
//                 <span>Sign Up</span>
//               </StyledListItem>
//             </>
//           )}
//         </StyledList>
//       </StyledDrawer>
//     </AppBar>
//   );
// }




