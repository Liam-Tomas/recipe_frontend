import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import CreateRecipeForm from './CreateRecipeForm';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recipes/myrecipes');
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  const handleNewRecipe = async (newRecipe) => {
    try {
      const response = await axios.post('http://localhost:3000/recipes/myrecipes', newRecipe);
      setRecipes((prevRecipes) => [...prevRecipes, response.data.recipe]);

      // Refresh the list of recipes after a new one is added
      const refreshResponse = await axios.get('http://localhost:3000/recipes/myrecipes');
      setRecipes(refreshResponse.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CreateRecipeForm onNewRecipe={handleNewRecipe} />
      <ul style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', listStyle: 'none', padding: '20px', 
        marginTop: '30px', 
        marginBottom: '30px', 
        gap: '25px',}}>
        {recipes.map((recipe) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;


