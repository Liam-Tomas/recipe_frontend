import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ExplorePage from './pages/ExplorePage'
import HomePage from './pages/HomePage'
import MyRecipesPage from './pages/MyRecipesPage'
import FilterPage from './pages/FilterPage'
import RecipeDetail from './components/RecipeDetail'

function App() {
  return (
    <div className="app">
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} /> 
          <Route path="/filter" element={<FilterPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
