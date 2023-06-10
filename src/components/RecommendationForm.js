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
  margin-top: 25px;
  padding: 0px 25px;

  & > .formControl {
    width: 160px;
    margin-right: 20px; // Add some space between form controls
  }

  .btnForm {
    
  }
`

function RecommendationForm() {
  const [genre, setGenre] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Retrieve the form state from the URL query parameters
    const prevGenre = searchParams.get('genre') || '';
    const prevLevel = searchParams.get('level') || '';
    const prevCategory = decodeURIComponent(searchParams.get('category') || '');

    // Set the form state based on the retrieved values
    setGenre(prevGenre);
    setLevel(prevLevel);
    setCategory(prevCategory);
  }, [searchParams]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Create a new URLSearchParams object
    const newSearchParams = new URLSearchParams();
    // Set the query parameters based on the form state
    newSearchParams.set('genre', genre);
    newSearchParams.set('level', level);
    newSearchParams.set('category', encodeURIComponent(category));
    // Update the URL with the new query parameters
    navigate(`/recommendations?${newSearchParams.toString()}`);
  };

  return (
    <StyledForm className='myForm' onSubmit={handleFormSubmit}>
      <FormControl className='formControl' sx={{ width: '160px' }}>
        <InputLabel id="genre-label">Genre</InputLabel>
        <Select
          labelId="???"
          id="???"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          label="Genre"
        >
          <MenuItem value="">-- ??? --</MenuItem>
          <MenuItem value="???">???</MenuItem>
          <MenuItem value="non???fiction">???</MenuItem>
        </Select>
      </FormControl>

      <FormControl className='formControl'>
        <InputLabel id="level-label">???</InputLabel>
        <Select
          labelId="level-label"
          id="level-select"
          value={level}
          onChange={(event) => setLevel(event.target.value)}
          label="??? "
        >
          <MenuItem value="">-- ??? --</MenuItem>
          <MenuItem value="???">???</MenuItem>
          <MenuItem value="???">???</MenuItem>
          <MenuItem value="???">???</MenuItem>
        </Select>
      </FormControl>

      <FormControl className='formControl'>
        <InputLabel id="category-label">???</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          label="Category"
        >
          <MenuItem value="">-- ??? --</MenuItem>
          <MenuItem value="Animals, Bugs & Pets">???</MenuItem>
          <MenuItem value="Art, Creativity & Music">???</MenuItem>
          <MenuItem value="General Literature">???</MenuItem>
          <MenuItem value="Hobbies, Sports & Outdoors">???</MenuItem>
          <MenuItem value="Science Fiction & Fantasy">???</MenuItem>
          <MenuItem value="Real Life">???</MenuItem>
          <MenuItem value="Science & Technology">???</MenuItem>
          <MenuItem value="Mystery & Suspense">???</MenuItem>
          <MenuItem value="Reference">???</MenuItem>
        </Select>
      </FormControl>

      <Button className='btnForm' type="submit" variant="contained">Search</Button>
    </StyledForm>
  );
}

export default RecommendationForm;
