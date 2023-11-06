

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MyRecipeCard from './MyRecipeCard';
import CreateRecipeForm from './CreateRecipeForm';
import { Button, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useContext(FirebaseAuthContext);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/recipes/myrecipes?userUID=${currentUser.uid}`);

        if (response.data && response.data.recipes) {
          setRecipes(response.data.recipes);
        }
      } catch (error) {
        console.error('Error fetching my recipes: ', error);
      }
    };
    fetchMyRecipes();
  }, [currentUser.uid]);

  const handleNewRecipe = async (newRecipe) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/recipes/myrecipes`, {
        ...newRecipe,
        userUID: currentUser.uid,
      });
      setRecipes((prevRecipes) => [...prevRecipes, response.data.recipe]);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/recipes/myrecipes/${recipeId}`, {
        data: { userUID: currentUser.uid }
      });
      if (response.status === 200) {
        setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe._id !== recipeId));
      }
    } catch (error) {
      console.error('Error removing recipe: ', error);
    }
  };

  const handleEditRecipe = async (updatedRecipe, recipeId) => {
    console.log("Editing recipe with ID:", recipeId);

    try {
      const response = await axios.put(`${API_BASE_URL}/recipes/myrecipes/edit/${recipeId}`, {
        ...updatedRecipe,
        userUID: currentUser.uid,
        
      });

      // Update recipes state with the updated recipe data
      setRecipes((prevRecipes) => {
        return prevRecipes.map((recipe) => {
          if (recipe._id === recipeId) {
            return response.data.recipe;
          } else {
            return recipe;
          }
        });
      });
      setShowModal(false);

    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <Fab
        color='primary'
        sx={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          margin: '30px',
        }}
        onClick={() => setShowModal(true)}
      >
        <AddIcon />
      </Fab>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <CreateRecipeForm onNewRecipe={handleNewRecipe} />
        </div>
      </Modal>
      <ul style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        padding: '20px',
        marginBottom: '30px',
        gap: '25px',
      }}>
        {recipes.map((recipe) => (
          <MyRecipeCard
            key={recipe._id}
            recipe={recipe}
            onRemove={handleRemoveRecipe}
            onEdit={handleEditRecipe} // pass the function
          />
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
