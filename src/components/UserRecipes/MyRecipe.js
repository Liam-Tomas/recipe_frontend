

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MyRecipeCard from './MyRecipeCard';
import CreateRecipeForm from './CreateRecipeForm';
import { Button, Modal, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import styled from 'styled-components';


const MyRecipeGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  margin-bottom: 30px;
  gap: 25px;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr); // 2 columns on smaller screens
  }

  @media (max-width: 868px) {
      grid-template-columns: repeat(2, 1fr); // 2 columns on smaller screens
  }

  @media (max-width: 750px) {
      grid-template-columns: repeat(1, 1fr); // 2 columns on smaller screens
      padding: 0px;
  }
`;

const NoRecipesMessage = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.palette.text.secondary};
  display:flex;
  flex-direction: column;
  justify-content:center;
  min-height:50vh;
  gap:20px;
  font-size:1.3rem;
  @media (max-width: 750px) {
    font-size:.8rem;
    padding:1.5rem;
  }
`;




const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useContext(FirebaseAuthContext);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchMyRecipes = async () => {
      setLoading(true); // Set loading to true when the fetch starts
      try {
        const response = await axios.get(`${API_BASE_URL}/recipes/myrecipes?userUID=${currentUser.uid}`);
        if (response.data && response.data.recipes) {
          setRecipes(response.data.recipes);
        }
      } catch (error) {
        console.error('Error fetching my recipes: ', error);
      } finally {
        setLoading(false); // Set loading to false when the fetch completes
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
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
        }}>
          <CircularProgress />
        </div>
      ) : recipes.length === 0 ? (
        <NoRecipesMessage>
          <h1>You haven't created any recipes yet.</h1>
          <h3>Start by adding a new recipe to your collection! </h3>
        </NoRecipesMessage>
      ) : (
        <MyRecipeGrid>
          {recipes.map((recipe) => (
            <MyRecipeCard
              key={recipe._id}
              recipe={recipe}
              onRemove={handleRemoveRecipe}
              onEdit={handleEditRecipe} // pass the function
            />
          ))}
        </MyRecipeGrid>
      )}

    </div>
  );
};

export default MyRecipes;
