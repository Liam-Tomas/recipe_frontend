import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import Recipe from './Recipe';
import { Button, CircularProgress } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


// Add sort options as a constant
const SORT_OPTIONS = ['popularity', 'healthiness', 'price', 'time', 'meta-score'];
const DIET_OPTIONS = ['none', 'vegetarian', 'gluten free', 'vegan', 'paleo', 'whole30'];
const TYPE_OPTIONS = ['none', 'main course', 'breakfast', 'appetizer', 'salad', 'dessert'];


const ComplexSearch = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState(SORT_OPTIONS[0]); // Initialize sort option to 'popularity'
    const [diet, setDiet] = useState(DIET_OPTIONS[0]); // Initialize diet option to 'vegetarian'
    const [type, setType] = useState(TYPE_OPTIONS[0]); // Initialize diet option to 'vegetarian'


    useEffect(() => {
        const storedRecipes = sessionStorage.getItem('recipes');
        if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
        }
        else {
            handleSearch(query, page);
        }
    }, [query, page]);

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const handleSetDiet = (event) => {
        const selectedDiet = event.target.value === "None" ? "" : event.target.value;
        setDiet(selectedDiet);
    };

    const handleSetType = (event) => {
        const selectedType = event.target.value === "None" ? "" : event.target.value;
        setType(selectedType);
    }

    const handleSearch = async (searchQuery, page = 1) => {
        setLoading(true);
        setQuery(searchQuery);
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/recipes/search',
            params: {
                query: searchQuery,
                sort, // add sort option to the request parameters
                diet, // add diet option to the request parameters
                type,
                page: page,
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data.results)
            setRecipes(response.data.results);
            sessionStorage.setItem('recipes', JSON.stringify(response.data.results));
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleNext = () => {
        sessionStorage.removeItem('recipes');
        setPage(page + 1);
    };

    const handlePrev = () => {
        if (page > 1) {
            sessionStorage.removeItem('recipes');
            setPage(page - 1);
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
            }}>
                <SearchBar
                    onSearch={(searchQuery) => {
                        sessionStorage.removeItem('recipes');
                        handleSearch(searchQuery, 1);
                    }}
                />
                <FormControl size="small">
                    <InputLabel id="sort-label" style={{
                        marginTop: '10px'
                    }}>Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        value={sort}
                        onChange={handleSortChange}
                        label="Sort By"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10px'
                        }}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="diet-label" style={{
                        marginTop: '10px'
                    }}>Diet</InputLabel>
                    <Select
                        labelId="diet-label"
                        id="diet-select"
                        value={diet}
                        onChange={handleSetDiet}
                        label="Diet"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10px',
                            width:'100px'
                            
                        }}
                    >
                        {DIET_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="diet-label" style={{
                        marginTop: '10px'
                    }}>Type</InputLabel>
                    <Select
                        labelId="diet-label"
                        id="diet-select"
                        value={type}
                        onChange={handleSetType}
                        label="Diet"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10px',
                            width:'100px'
                            
                        }}
                    >
                        {TYPE_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {loading ? (
                <p
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        minHeight: '40vh',
                        alignItems: 'center',
                        fontSize: '1.5rem',
                        color: 'black',
                    }}
                >
                    <CircularProgress/>
                </p>
            ) : (
                <>
                    <ul
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            listStyle: 'none',
                            padding: '20px',
                            marginTop: '30px',
                            marginBottom: '30px',

                            gap: '25px',
                        }}
                    >
                        {recipes.map((recipe) => (
                            <Recipe key={recipe.id} recipe={recipe} />
                        ))}
                    </ul>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                            marginTop: '1rem',
                        }}
                    >
                        {!loading && page !== 1 && (
                            <Button variant="outlined" onClick={handlePrev} disabled={page === 1}>
                                Prev
                            </Button>
                        )}
                        {!loading && (
                            <Button variant="outlined" onClick={handleNext}>
                                Next
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ComplexSearch;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';
// import styled from 'styled-components';
// import Recipe from './Recipe';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';

// // Add sort options as a constant
// const SORT_OPTIONS = ['popularity', 'healthiness', 'price', 'time', 'meta-score'];

// const ComplexSearch = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [page, setPage] = useState(1);
//     const [query, setQuery] = useState('');
//     const [diets, setDiet] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [sort, setSort] = useState(SORT_OPTIONS[0]); // Initialize sort option to 'popularity'

//     useEffect(() => {
//         const storedRecipes = sessionStorage.getItem('recipes');
//         if (storedRecipes) {
//             setRecipes(JSON.parse(storedRecipes));
//         }
//         else {
//             handleSearch(query, page);
//         }
//     }, [query, page]);

//     const handleSortChange = (event) => {
//         setSort(event.target.value);
//     };

//     const handleDietChange = (event) => {
//         setDiet(event.target.value);
//     };

//     const handleSearch = async (searchQuery, page = 1) => {
//         setLoading(true);
//         setQuery(searchQuery);
//         const options = {
//           method: 'GET',
//           url: 'http://localhost:3000/recipes/search',
//           params: {
//             query: searchQuery,
//             sort,
//             page,
//           },
//         };
      
//         try {
//           const response = await axios.request(options);
//           console.log(response.data.results);
//           const filteredRecipes = response.data.results.filter((recipe) => {
//             if (diets.length === 0) {
//               // No diet filter selected, return all recipes
//               return true;
//             } else {
//               // Check if any of the selected diets are included in the recipe's diets array
//               const recipeDiets = recipe.diets || []; // Handle case when recipe.diets is undefined
//               for (const selectedDiet of diets) {
//                 if (recipeDiets.includes(selectedDiet.toLowerCase())) {
//                   return true;
//                 }
//               }
//               return false;
//             }
//           });
//           setRecipes(filteredRecipes);
//           sessionStorage.setItem('recipes', JSON.stringify(filteredRecipes));
//         } catch (error) {
//           console.error(error);
//         }
//         setLoading(false);
//       };
      

//     const handleNext = () => {
//         sessionStorage.removeItem('recipes');
//         setPage(page + 1);
//     };

//     const handlePrev = () => {
//         if (page > 1) {
//             sessionStorage.removeItem('recipes');
//             setPage(page - 1);
//         }
//     };

//     return (
//         <div>
//             <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '1rem',
//             }}>
//                 <SearchBar
//                     onSearch={(searchQuery) => {
//                         sessionStorage.removeItem('recipes');
//                         handleSearch(searchQuery, 1);
//                     }}
//                 />
//                 <FormControl>
//                     <InputLabel id="sort-label" style={{
//                         marginTop: '10px'
//                     }}>Sort By</InputLabel>
//                     <Select
//                         labelId="sort-label"
//                         id="sort-select"
//                         value={sort}
//                         onChange={handleSortChange}
//                         label="Sort By"
//                         style={{
//                             height: '45px',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             marginTop: '10px'
//                         }}
//                     >
//                         {SORT_OPTIONS.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <FormControl>
//                     <InputLabel id="diet-label" style={{
//                         marginTop: '10px'
//                     }}>Diet</InputLabel>
//                     <Select
//                         labelId="diet-label"
//                         id="diet-select"
//                         value={diets}
//                         onChange={handleDietChange}
//                         label="Diet"
//                         style={{
//                             height: '45px',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             marginTop: '10px'
//                         }}
//                     >
//                         <MenuItem value="">All Diets</MenuItem>
//                         <MenuItem value="Gluten Free">Gluten Free</MenuItem>
//                         <MenuItem value="Ketogenic">Ketogenic</MenuItem>
//                         <MenuItem value="Vegetarian">Vegetarian</MenuItem>
//                         <MenuItem value="Lacto-Vegetarian">Lacto-Vegetarian</MenuItem>
//                         <MenuItem value="Ovo-Vegetarian">Ovo-Vegetarian</MenuItem>
//                         <MenuItem value="Vegan">Vegan</MenuItem>
//                         <MenuItem value="Pescetarian">Pescetarian</MenuItem>
//                         <MenuItem value="Paleo">Paleo</MenuItem>
//                         <MenuItem value="Primal">Primal</MenuItem>
//                         <MenuItem value="Low FODMAP">Low FODMAP</MenuItem>
//                         <MenuItem value="Whole30">Whole30</MenuItem>
//                     </Select>
//                 </FormControl>
//             </div>
//             {loading ? (
//                 <p
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         minHeight: '40vh',
//                         alignItems: 'center',
//                         fontSize: '1.5rem',
//                         color: 'black',
//                     }}
//                 >
//                     Loading...
//                 </p>
//             ) : (
//                 <>
//                     <ul
//                         style={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//                             listStyle: 'none',
//                             padding: '20px',
//                             marginTop: '30px',
//                             gap: '25px',
//                         }}
//                     >
//                         {recipes.map((recipe) => (
//                             <Recipe key={recipe.id} recipe={recipe} />
//                         ))}
//                     </ul>
//                     <div
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             gap: '1rem',
//                             marginTop: '1rem',
//                         }}
//                     >
//                         {!loading && page !== 1 && (
//                             <Button variant="outlined" onClick={handlePrev} disabled={page === 1}>
//                                 Prev
//                             </Button>
//                         )}
//                         {!loading && (
//                             <Button variant="outlined" onClick={handleNext}>
//                                 Next
//                             </Button>
//                         )}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ComplexSearch;

