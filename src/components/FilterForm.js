import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding: 0px 25px;

  & > .formControl {
    width: 160px;
    margin-right: 20px; // Add some space between form controls
  }

  .btnForm {
    
  }
`

function FilterForm() {
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [type, setType] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Retrieve the form state from the URL query parameters
    const prevCuisine = searchParams.get('cuisine') || '';
    const prevDiet = searchParams.get('diet') || '';
    const prevType = decodeURIComponent(searchParams.get('type') || '');
    const prevMaxReadyTime = searchParams.get('maxReadyTime') || '';
    const prevMinCalories = searchParams.get('minCalories') || '';
    const prevMaxCalories = searchParams.get('maxCalories') || '';

    // Set the form state based on the retrieved values
    setCuisine(prevCuisine);
    setDiet(prevDiet);
    setType(prevType);
    setMaxReadyTime(prevMaxReadyTime);
    setMinCalories(prevMinCalories);
    setMaxCalories(prevMaxCalories);
  }, [searchParams]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Create a new URLSearchParams object
    const newSearchParams = new URLSearchParams();
    // Set the query parameters based on the form state
    newSearchParams.set('cuisine', cuisine);
    newSearchParams.set('diet', diet);
    newSearchParams.set('type', encodeURIComponent(type));
    newSearchParams.set('maxReadyTime', maxReadyTime);
    newSearchParams.set('minCalories', minCalories);
    newSearchParams.set('maxCalories', maxCalories);
    // Update the URL with the new query parameters
    navigate(`/recipes?${newSearchParams.toString()}`);
  };

  return (
    <StyledForm className='myForm' onSubmit={handleFormSubmit}>
      <FormControl className='formControl' sx={{ width: '160px' }}>
        <InputLabel id="cuisine-label">Cuisine</InputLabel>
        <Select
          labelId="cuisine-label"
          id="cuisine-select"
          value={cuisine}
          onChange={(event) => setCuisine(event.target.value)}
          label="Cuisine"
        >
          <MenuItem value="">-- Select Cuisine --</MenuItem>
          <MenuItem value="italian">Italian</MenuItem>
          <MenuItem value="mexican">Mexican</MenuItem>
          <MenuItem value="indian">Indian</MenuItem>
          {/* Add more cuisine options */}
        </Select>
      </FormControl>

      <FormControl className='formControl'>
        <InputLabel id="diet-label">Diet</InputLabel>
        <Select
          labelId="diet-label"
          id="diet-select"
          value={diet}
          onChange={(event) => setDiet(event.target.value)}
          label="Diet"
        >
          <MenuItem value="">-- Select Diet --</MenuItem>
          <MenuItem value="vegetarian">Vegetarian</MenuItem>
          <MenuItem value="vegan">Vegan</MenuItem>
          <MenuItem value="gluten-free">Gluten-Free</MenuItem>
          {/* Add more diet options */}
        </Select>
      </FormControl>

      <FormControl className='formControl'>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          value={type}
          onChange={(event) => setType(event.target.value)}
          label="Type"
        >
          <MenuItem value="">-- Select Type --</MenuItem>
          <MenuItem value="main course">Main Course</MenuItem>
          <MenuItem value="side dish">Side Dish</MenuItem>
          <MenuItem value="dessert">Dessert</MenuItem>
          <MenuItem value="appetizer">Appetizer</MenuItem>
          <MenuItem value="salad">Salad</MenuItem>
          <MenuItem value="bread">Bread</MenuItem>
          <MenuItem value="breakfast">Breakfast</MenuItem>
          <MenuItem value="soup">Soup</MenuItem>
          <MenuItem value="beverage">Beverage</MenuItem>
          <MenuItem value="sauce">Sauce</MenuItem>
          <MenuItem value="marinade">Marinade</MenuItem>
          <MenuItem value="fingerfood">Fingerfood</MenuItem>
          <MenuItem value="snack">Snack</MenuItem>
          <MenuItem value="drink">Drink</MenuItem>
        </Select>
      </FormControl>

      <FormControl className='formControl'>
        <InputLabel htmlFor="maxReadyTime">Max Ready Time</InputLabel>
        <Select
          id="maxReadyTime"
          value={maxReadyTime}
          onChange={(event) => setMaxReadyTime(event.target.value)}
        >
          <MenuItem value="">-- Select Max Ready Time --</MenuItem>
          <MenuItem value="10">10 minutes</MenuItem>
          <MenuItem value="20">20 minutes</MenuItem>
          <MenuItem value="30">30 minutes</MenuItem>
          {/* Add more options for max ready time */}
        </Select>
      </FormControl>

      <FormControl className='formControl'>
        <InputLabel htmlFor="minCalories">Min Calories</InputLabel>
        <Select
          id="minCalories"
          value={minCalories}
          onChange={(event) => setMinCalories(event.target.value)}
        >
          <MenuItem value="">-- Select Min Calories --</MenuItem>
          <MenuItem value="50">50 calories</MenuItem>
          <MenuItem value="100">100 calories</MenuItem>
          <MenuItem value="200">200 calories</MenuItem>
          {/* Add more options for min calories */}
        </Select>
      </FormControl>

      <FormControl className='formControl'>
        <InputLabel htmlFor="maxCalories">Max Calories</InputLabel>
        <Select
          id="maxCalories"
          value={maxCalories}
          onChange={(event) => setMaxCalories(event.target.value)}
        >
          <MenuItem value="">-- Select Max Calories --</MenuItem>
          <MenuItem value="500">500 calories</MenuItem>
          <MenuItem value="800">800 calories</MenuItem>
          <MenuItem value="1000">1000 calories</MenuItem>
          {/* Add more options for max calories */}
        </Select>
      </FormControl>

      <Button className='btnForm' type="submit" variant="contained">Search</Button>
    </StyledForm>
  );
}

export default FilterForm;
