import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FirebaseAuthContext } from './FirebaseAuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from './components/NavBar';
import ExplorePage from './pages/ExplorePage'
import HomePage from './pages/HomePage'
import FilterPage from './pages/FilterPage'
import RecipeDetail from './components/RecipeDetail'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import MyRecipePage from './pages/MyRecipePage'
import FavoritesPage from './pages/FavoritesPage'
import ProfilePage from './pages/ProfilePage'


import Footer from './components/Footer';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import usePersistentTheme from './utils/themeUtils'; // import the custom hook



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const [theme, setTheme] = usePersistentTheme(); // use custom theme hook
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      console.log("User from Firebase:", user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div></div>; // Or replace with your loading component
  }

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <FirebaseAuthContext.Provider value={currentUser}>
            <div className="app">
              <NavBar theme={theme}
                setTheme={setTheme} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="/filter" element={<FilterPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/myrecipes" element={<MyRecipePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/profile" element={<ProfilePage />} />


              </Routes>
              <Footer />
            </div>
          </FirebaseAuthContext.Provider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;


