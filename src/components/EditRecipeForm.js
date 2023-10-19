import React, { useState } from 'react';
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const EditRecipeForm = ({ initialRecipe, onRecipeUpdate, onClose }) => {
    const theme = useTheme();

    const [recipeData, setRecipeData] = useState({
        ...initialRecipe,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setRecipeData((prevData) => ({ ...prevData, [name]: fieldValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRecipeUpdate(recipeData, initialRecipe._id);
        onClose();  // Close the modal after updating the recipe

    };

    return (
        <div style={{
            width: '550px',
            backgroundColor: theme.palette.background.default,
            padding: '50px'
        }}>
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
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '15px' }}>
                    Update Recipe
                </Button>
            </form>
        </div>
    );
};

export default EditRecipeForm;


