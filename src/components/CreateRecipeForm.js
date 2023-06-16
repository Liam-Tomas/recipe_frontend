import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const CreateRecipeForm = ({ onNewRecipe }) => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewRecipe(recipeData);
    setRecipeData({ title: '', image: '' }); // Reset the form fields
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: '',
      justifyContent: 'center',
      minHeight: '30vh',
      alignItems: 'center',
      alignContent:'center'
    }}>
      <form onSubmit={handleSubmit} style={{
      }}>
        <TextField label="Title" type="text" name="title" value={recipeData.title} onChange={handleChange} variant="outlined" style={{}} />
        <TextField label="Servings" type="number" name="servings" value={recipeData.servings} onChange={handleChange} variant="outlined" style={{}} />
        <TextField label="Image URL" type="text" name="image" value={recipeData.image} onChange={handleChange} variant="outlined" style={{ }} />
        <Button type="submit" variant="contained" color="primary">Create Recipe</Button>
      </form>
    </div>
  );
};

export default CreateRecipeForm;
