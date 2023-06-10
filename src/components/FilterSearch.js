import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TextField, Checkbox, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

const FilterSearch = () => {
    const [diets, setDiets] = useState('');
    const [veryPopular, setVeryPopular] = useState(false);
    const [healthScore, setHealthScore] = useState('');
    const [cookingMinutes, setCookingMinutes] = useState('');
    const [cuisines, setCuisines] = useState('');

    const cuisineOptions = ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

    const dietOptions = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'];


    const handleFilterSearch = async () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/recipes/filter',
            params: {
                diet: diets,
                sort: veryPopular ? 'popularity' : '',
                cuisine: cuisines,
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{
            marginTop: '100px',
        }}>
            <FormControl fullWidth>
                <InputLabel id="diets-label">Diets</InputLabel>
                <Select
                    labelId="diets-label"
                    value={diets}
                    onChange={(e) => setDiets(e.target.value)}
                >
                    {dietOptions.map((diet) => (
                        <MenuItem value={diet}>{diet}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControlLabel
                control={<Checkbox checked={veryPopular} onChange={(e) => setVeryPopular(e.target.checked)} />}
                label="Very Popular"
            />


            <FormControl fullWidth>
                <InputLabel id="cuisines-label">Cuisines</InputLabel>
                <Select
                    labelId="cuisines-label"
                    value={cuisines}
                    onChange={(e) => setCuisines(e.target.value)}
                >
                    {cuisineOptions.map((cuisine) => (
                        <MenuItem value={cuisine}>{cuisine}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant="outlined" onClick={handleFilterSearch}>Search</Button>
        </div>
    );
};

export default FilterSearch;