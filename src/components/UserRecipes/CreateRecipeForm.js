import React, { useState } from 'react';
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';

const FormWrapper = styled.ul`
  background-color: ${(props) => props.theme.palette.background.paper};
  width: 550px;
  padding: 50px;

  @media (max-width: 750px) {
    width: 100%;
  }
`;



const CreateRecipeForm = ({ onNewRecipe }) => {
  const theme = useTheme();

  const INITIAL_RECIPE_STATE = {
    title: '',
    image: '',
    servings: '',
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    preparationMinutes: '',
    summary: '',
    cuisines: [],
    dishTypes: [],
    diets: [],
    occasions: [],
  };

  const [recipeData, setRecipeData] = useState(INITIAL_RECIPE_STATE);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setRecipeData((prevData) => ({ ...prevData, [name]: fieldValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewRecipe(recipeData);
    setRecipeData(INITIAL_RECIPE_STATE);  // use the constant here to reset the state
    ;
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <TextField
          label="Title"
          type="text"
          name="title"
          value={recipeData.title}
          onChange={handleChange}
          variant="outlined"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <TextField
          label="Image URL"
          type="text"
          name="image"
          value={recipeData.image}
          onChange={handleChange}
          variant="outlined"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <div style={{ display: 'flex', marginBottom: '10px', width: '100%' }}>
          <TextField
            label="Servings"
            type="number"
            name="servings"
            value={recipeData.servings}
            onChange={handleChange}
            variant="outlined"
            style={{ marginRight: '10px', width: '50%' }}
          />
          <TextField
            label="Prep Time (minutes)"
            type="number"
            name="preparationMinutes"
            value={recipeData.preparationMinutes}
            onChange={handleChange}
            variant="outlined"
            style={{ width: '50%' }}
          />
        </div>
        <TextField
          label="Summary"
          multiline
          rows={4}
          name="summary"
          value={recipeData.summary}
          onChange={handleChange}
          variant="outlined"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <FormControlLabel
            control={
              <Checkbox
                name="vegetarian"
                checked={recipeData.vegetarian}
                onChange={handleChange}
              />
            }
            label="Vegetarian"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="vegan"
                checked={recipeData.vegan}
                onChange={handleChange}
              />
            }
            label="Vegan"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="glutenFree"
                checked={recipeData.glutenFree}
                onChange={handleChange}
              />
            }
            label="Gluten Free"
          />
        </div>
        {/* Include more fields as needed */}
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '15px' }}>
          Create Recipe
        </Button>
      </form>
    </FormWrapper>
  );
};

export default CreateRecipeForm;
