import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function Dropdown() {
  const [diet, setDiet] = React.useState('');

  const handleChange = (event) => {
    setDiet(event.target.value);
    
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="demo-simple-select-outlined-label">Diet</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={diet}
        onChange={handleChange}
        label="Diet"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'gluten free'}>Gluten Free</MenuItem>
        <MenuItem value={'ketogenic'}>Ketogenic</MenuItem>
        <MenuItem value={'vegetarian'}>Vegetarian</MenuItem>
        <MenuItem value={'vegan'}>Vegan</MenuItem>
        <MenuItem value={'pescetarian'}>Pescetarian</MenuItem>
        <MenuItem value={'paleo'}>Paleo</MenuItem>
        <MenuItem value={'primal'}>Primal</MenuItem>
        <MenuItem value={'whole30'}>Whole30</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Dropdown;
