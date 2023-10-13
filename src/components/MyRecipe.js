// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Recipe from './Recipe';
// import MyRecipeCard from './MyRecipeCard'
// import CreateRecipeForm from './CreateRecipeForm';
// import { Button, Typography, Modal } from '@mui/material';
// import Icon from '@mui/material/Icon';
// import AddIcon from '@mui/icons-material/Add';
// import Fab from '@mui/material/Fab';


// const MyRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   // Fetch recipes on component mount
//   useEffect(() => {

//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/recipes/myrecipes');
//         setRecipes(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleNewRecipe = async (newRecipe) => {
//     try {
//       const response = await axios.post('http://localhost:3000/recipes/myrecipes', newRecipe);
//       setRecipes((prevRecipes) => [...prevRecipes, response.data.recipe]);

//       // Refresh the list of recipes after a new one is added
//       const refreshResponse = await axios.get('http://localhost:3000/recipes/myrecipes');
//       setRecipes(refreshResponse.data);
//       setShowModal(false);

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <Fab
//         color='primary'
//         sx={{
//           position: 'fixed',
//           bottom: '0',
//           right: '0',
//           margin: '30px',
//         }}
//         onClick={() => setShowModal(true)}
//       >
//         <AddIcon />
//       </Fab>

//       <Modal open={showModal} onClose={() => setShowModal(false)}>
//         <div style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//         }}>
//           <CreateRecipeForm onNewRecipe={handleNewRecipe} />
//         </div>
//       </Modal>
//       <ul style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', listStyle: 'none', padding: '20px',
//         marginBottom: '30px',
//         gap: '25px',
//       }}>
//         {recipes.map((recipe) => (
//           <MyRecipeCard key={recipe._id} recipe={recipe} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyRecipes;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MyRecipeCard from './MyRecipeCard';
import CreateRecipeForm from './CreateRecipeForm';
import { Button, Typography, Modal } from '@mui/material';
import Icon from '@mui/material/Icon';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Footer from './Footer.js';
import { FirebaseAuthContext } from '../FirebaseAuthContext';


const MyRecipes = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useContext(FirebaseAuthContext);

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
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveRecipe = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/myrecipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'x-user-uid': currentUser.uid,
        }
      });

      if (response.ok) {
        // Remove the recipe from the local state
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
      }
    } catch (error) {
      console.error('Error removing recipe: ', error);
    }
  };

  const filteredRecipes = category === 'All' ? recipes : recipes.filter((recipe) => recipe.category === category);

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
        gridTemplateColumns: 'repeat(4, 1fr)',  
        padding: '20px',
        marginBottom: '30px',
        gap: '25px',
      }}>
        {filteredRecipes.map((recipe) => (
          <MyRecipeCard key={recipe._id} recipe={recipe} onRemove={handleRemoveRecipe} />
        ))}
      </ul>
    </div>

  );
};

export default MyRecipes;



