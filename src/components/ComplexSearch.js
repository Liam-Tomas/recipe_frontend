// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';
// import styled from 'styled-components';
// import Recipe from './Recipe';
// import { Button, CircularProgress } from '@mui/material';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';


// // Add sort options as a constant
// const SORT_OPTIONS = ['popularity', 'healthiness', 'price', 'time', 'meta-score'];
// const DIET_OPTIONS = ['none', 'vegetarian', 'gluten free', 'vegan', 'paleo', 'whole30'];
// const TYPE_OPTIONS = ['none', 'main course', 'breakfast', 'appetizer', 'salad', 'dessert'];


// const ComplexSearch = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [page, setPage] = useState(1);
//     const [query, setQuery] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [sort, setSort] = useState(SORT_OPTIONS[0]); // Initialize sort option to 'popularity'
//     const [diet, setDiet] = useState(DIET_OPTIONS[0]); // Initialize diet option to 'vegetarian'
//     const [type, setType] = useState(TYPE_OPTIONS[0]); // Initialize diet option to 'vegetarian'


//     // useEffect(() => {
//     //     const storedRecipes = sessionStorage.getItem('recipes');
//     //     if (storedRecipes) {
//     //         setRecipes(JSON.parse(storedRecipes));
//     //     }
//     //     else {
//     //         handleSearch(query, page);
//     //     }
//     // }, [query, page]);

//     useEffect(() => {
//         const storedQuery = sessionStorage.getItem('query');
//         const storedPage = sessionStorage.getItem('page');
//         const storedRecipes = sessionStorage.getItem('recipes');

//         if (storedRecipes) {
//             setRecipes(JSON.parse(storedRecipes));
//         }
//         if (storedQuery) {
//             setQuery(storedQuery);
//         }
//         if (storedPage) {
//             setPage(Number(storedPage));
//         }

//         // if no stored recipes, fetch them based on stored query and page or defaults
//         if (!storedRecipes) {
//             handleSearch(storedQuery, Number(storedPage));
//         }
//     }, []);

//     useEffect(() => {
//         handleSearch(query, page);
//         sessionStorage.setItem('query', query);
//         sessionStorage.setItem('page', page.toString());
//         sessionStorage.setItem('recipes', JSON.stringify(recipes));
//     }, [query, page, sort, diet, type]);


//     const handleSortChange = (event) => {
//         setSort(event.target.value);
//     };

//     const handleSetDiet = (event) => {
//         const selectedDiet = event.target.value === "None" ? "" : event.target.value;
//         setDiet(selectedDiet);
//     };

//     const handleSetType = (event) => {
//         const selectedType = event.target.value === "None" ? "" : event.target.value;
//         setType(selectedType);
//     }

//     // const handleSearch = async (searchQuery, page = 1) => {
//     //     setLoading(true);
//     //     setQuery(searchQuery);
//     //     const options = {
//     //         method: 'GET',
//     //         url: 'http://localhost:3000/recipes/search',
//     //         params: {
//     //             query: searchQuery,
//     //             sort, // add sort option to the request parameters
//     //             diet, // add diet option to the request parameters
//     //             type,
//     //             page: page,
//     //         },
//     //     };

//     //     try {
//     //         const response = await axios.request(options);
//     //         console.log(response.data.results)
//     //         setRecipes(response.data.results);
//     //         sessionStorage.setItem('recipes', JSON.stringify(response.data.results));
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     //     setLoading(false);
//     // };

//     const handleSearch = async (searchQuery = query, currentPage = page) => {
//         setLoading(true);

//         const options = {
//             method: 'GET',
//             url: 'http://localhost:3000/recipes/search',
//             params: {
//                 query: searchQuery,
//                 sort: sort,
//                 diet: diet,
//                 type: type,
//                 page: currentPage,
//             },
//         };

//         try {
//             const response = await axios.request(options);
//             setRecipes(response.data.results);
//             sessionStorage.setItem('recipes', JSON.stringify(response.data.results));
//             sessionStorage.setItem('query', searchQuery);
//             sessionStorage.setItem('page', currentPage.toString());
//         } catch (error) {
//             console.error(error);
//         }

//         setLoading(false);
//     };


//     const handleNext = () => {
//         setPage(page + 1);
//     };

//     const handlePrev = () => {
//         if (page > 1) {
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
//                         setPage(1);
//                         setQuery(searchQuery);
//                         sessionStorage.removeItem('recipes'); // force a new fetch
//                         handleSearch(searchQuery, 1);
//                     }}
//                 />
//                 <FormControl size="small">
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
//                 <FormControl size="small">
//                     <InputLabel id="diet-label" style={{
//                         marginTop: '10px'
//                     }}>Diet</InputLabel>
//                     <Select
//                         labelId="diet-label"
//                         id="diet-select"
//                         value={diet}
//                         onChange={handleSetDiet}
//                         label="Diet"
//                         style={{
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             marginTop: '10px',
//                             width:'100px'

//                         }}
//                     >
//                         {DIET_OPTIONS.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <FormControl size="small">
//                     <InputLabel id="diet-label" style={{
//                         marginTop: '10px'
//                     }}>Type</InputLabel>
//                     <Select
//                         labelId="diet-label"
//                         id="diet-select"
//                         value={type}
//                         onChange={handleSetType}
//                         label="Diet"
//                         style={{
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             marginTop: '10px',
//                             width:'100px'

//                         }}
//                     >
//                         {TYPE_OPTIONS.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
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
//                     <CircularProgress/>
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
//                             marginBottom: '30px',
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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';
// import Recipe from './Recipe';
// import { Button, CircularProgress } from '@mui/material';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';

// const SORT_OPTIONS = ['popularity', 'healthiness', 'price', 'time', 'meta-score'];
// const DIET_OPTIONS = ['none', 'vegetarian', 'gluten free', 'vegan', 'paleo', 'whole30'];
// const TYPE_OPTIONS = ['none', 'main course', 'breakfast', 'appetizer', 'salad', 'dessert'];

// const ComplexSearch = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [page, setPage] = useState(1);
//     const [query, setQuery] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [sort, setSort] = useState(SORT_OPTIONS[0]);
//     const [diet, setDiet] = useState(DIET_OPTIONS[0]);
//     const [type, setType] = useState(TYPE_OPTIONS[0]);

//     useEffect(() => {
//         getSavedRecipes();
//         handleSearch(query, page);
//     }, [query, page]);

//     const handleSortChange = (event) => {
//         setSort(event.target.value);
//     };

//     const handleSetDiet = (event) => {
//         const selectedDiet = event.target.value === "None" ? "" : event.target.value;
//         setDiet(selectedDiet);
//     };

//     const handleSetType = (event) => {
//         const selectedType = event.target.value === "None" ? "" : event.target.value;
//         setType(selectedType);
//     }

//     const getSavedRecipes = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/recipes'); // replace this with the correct endpoint to get saved recipes
//             setRecipes(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleSearch = async (searchQuery, page = 1) => {
//         setLoading(true);
//         setQuery(searchQuery);
//         const options = {
//             method: 'GET',
//             url: 'http://localhost:3000/recipes/search',
//             params: {
//                 query: searchQuery,
//                 sort,
//                 diet,
//                 type,
//                 page: page,
//             },
//         };

//         try {
//             const response = await axios.request(options);
//             setRecipes(response.data.results);
//         } catch (error) {
//             console.error(error);
//         }
//         setLoading(false);
//     };

//     const handleNext = () => {
//         setPage(page + 1);
//     };

//     const handlePrev = () => {
//         if (page > 1) {
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
//                         handleSearch(searchQuery, 1);
//                     }}
//                 />
//                 <FormControl size="small">
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
//                 <FormControl size="small">
//                     <InputLabel id="diet-label" style={{
//                         marginTop: '10px'
//                     }}>Diet</InputLabel>
//                     <Select
//                         labelId="diet-label"
//                         id="diet-select"
//                         value={diet}
//                         onChange={handleSetDiet}
//                         label="Diet"
//                         style={{
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             marginTop: '10px',
//                             width:'100px'

//                         }}
//                     >
//                         {DIET_OPTIONS.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <FormControl size="small">
//                     <InputLabel id="type-label" style={{
//                         marginTop: '10px'
//                     }}>Type</InputLabel>
//                     <Select
//                         labelId="type-label"
//                         id="type-select"
//                         value={type}
//                         onChange={handleSetType}
//                         label="Type"
//                         style={{
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             marginTop: '10px',
//                             width:'100px'

//                         }}
//                     >
//                         {TYPE_OPTIONS.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
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
//                     <CircularProgress/>
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
//                             marginBottom: '30px',
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';
// import Recipe from './Recipe';
// import { Button, CircularProgress } from '@mui/material';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import styled from 'styled-components';

// const GridContainer = styled.div`

// `;


// const SORT_OPTIONS = ['popularity', 'healthiness', 'price', 'time', 'meta-score'];
// const DIET_OPTIONS = ['none', 'vegetarian', 'gluten free', 'vegan', 'paleo', 'whole30'];
// const TYPE_OPTIONS = ['none', 'main course', 'breakfast', 'appetizer', 'salad', 'dessert'];



// const ComplexSearch = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [page, setPage] = useState(1);
//     const [query, setQuery] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [sort, setSort] = useState(SORT_OPTIONS[0]);
//     const [diet, setDiet] = useState(DIET_OPTIONS[0]);
//     const [type, setType] = useState(TYPE_OPTIONS[0]);

//     useEffect(() => {
//         const storedQuery = sessionStorage.getItem('query');
//         const storedPage = sessionStorage.getItem('page');
//         const storedRecipes = sessionStorage.getItem('recipes');
//         const storedSort = sessionStorage.getItem('sort'); // <-- Add this line
//         const storedDiet = sessionStorage.getItem('diet'); // <-- Add this line
//         const storedType = sessionStorage.getItem('type'); // <-- Add this line

//         if (storedRecipes) setRecipes(JSON.parse(storedRecipes));
//         if (storedQuery) setQuery(storedQuery);
//         if (storedPage) setPage(Number(storedPage));
//         if (storedSort) setSort(storedSort); // <-- Add this line
//         if (storedDiet) setDiet(storedDiet); // <-- Add this line
//         if (storedType) setType(storedType); // <-- Add this line
//         if (!storedRecipes) {
//             handleSearch(storedQuery, Number(storedPage));
//         }
//         // Don't fetch recipes here
//     }, []);




//     const handleSortChange = (event) => {
//         setSort(event.target.value);
//     };

//     const handleSetDiet = (event) => {
//         const selectedDiet = event.target.value === "None" ? "" : event.target.value;
//         setDiet(selectedDiet);
//     };

//     const handleSetType = (event) => {
//         const selectedType = event.target.value === "None" ? "" : event.target.value;
//         setType(selectedType);
//     }

//     const handleSearch = async (searchQuery = query, currentPage = page) => {
//         setLoading(true);

//         const options = {
//             method: 'GET',
//             url: 'http://localhost:3000/recipes/search',
//             params: {
//                 query: searchQuery,
//                 sort: sort,
//                 diet: diet,
//                 type: type,
//                 page: currentPage,
//             },
//         };

//         try {
//             const response = await axios.request(options);
//             setRecipes(response.data.results);
//             sessionStorage.setItem('recipes', JSON.stringify(response.data.results));
//             sessionStorage.setItem('query', searchQuery);
//             sessionStorage.setItem('page', currentPage.toString());
//             sessionStorage.setItem('sort', sort);
//             sessionStorage.setItem('diet', diet);
//             sessionStorage.setItem('type', type);
//         } catch (error) {
//             console.error(error);
//         }

//         setLoading(false);
//     };

//     const handleNext = () => {
//         const newPage = page + 1;
//         setPage(newPage);
//         sessionStorage.setItem('page', newPage.toString());
//     };

//     const handlePrev = () => {
//         if (page > 1) {
//             const newPage = page - 1;
//             setPage(newPage);
//             sessionStorage.setItem('page', newPage.toString());
//         }
//     };

//     const performSearch = (searchQuery) => {
//         setPage(1);
//         setQuery(searchQuery);
//         sessionStorage.removeItem('recipes'); // force a new fetch
//         handleSearch();
//     };

//     return (
//         <div>
//             <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '1rem',
//             }}>
//                 <SearchBar onSearch={performSearch} onChange={setQuery} />
//                 <FormControl size="small">
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
//                 <FormControl size="small">
//                     <InputLabel id="diet-label" style={{
//                         marginTop: '10px'
//                     }}>Diet</InputLabel>
//                     <Select
//                         labelId="diet-label"
//                         id="diet-select"
//                         value={diet}
//                         onChange={handleSetDiet}
//                         label="Diet"
//                         style={{
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             marginTop: '10px',
//                             width: '100px'

//                         }}
//                     >
//                         {DIET_OPTIONS.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <FormControl size="small">
//                     <InputLabel id="diet-label" style={{
//                         marginTop: '10px'
//                     }}>Type</InputLabel>
//                     <Select
//                         labelId="diet-label"
//                         id="diet-select"
//                         value={type}
//                         onChange={handleSetType}
//                         label="Diet"
//                         style={{
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             marginTop: '10px',
//                             width: '100px'

//                         }}
//                     >
//                         {TYPE_OPTIONS.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={performSearch}
//                     style={{ marginTop: '10px', marginLeft: '15px' }}
//                 >
//                     Search
//                 </Button>
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
//                     <CircularProgress />
//                 </p>
//             ) : (
//                 <>

//                     <GridContainer
//                         style={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(4, 1fr)',
//                             listStyle: 'none',
//                             padding: '20px',
//                             marginTop: '30px',
//                             marginBottom: '30px',
//                             gap: '25px',
//                         }}
//                     >
//                         {recipes.map((recipe) => (
//                             <Recipe key={recipe.id} recipe={recipe} />
//                         ))}
//                     </GridContainer>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Recipe from './Recipe';
import { Button, CircularProgress } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';

const GridContainer = styled.div`

`;

const SORT_OPTIONS = ['popularity', 'healthiness', 'price', 'time', 'meta-score'];
const DIET_OPTIONS = ['none', 'vegetarian', 'gluten free', 'vegan', 'paleo', 'whole30'];
const TYPE_OPTIONS = ['none', 'main course', 'breakfast', 'appetizer', 'salad', 'dessert'];

const RESULTS_PER_PAGE = 10; // bc 10 results per page


const ComplexSearch = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState(SORT_OPTIONS[0]);
    const [diet, setDiet] = useState(DIET_OPTIONS[0]);
    const [type, setType] = useState(TYPE_OPTIONS[0]);

    useEffect(() => {
        const storedQuery = sessionStorage.getItem('query');
        const storedPage = sessionStorage.getItem('page');
        const storedRecipes = sessionStorage.getItem('recipes');
        const storedSort = sessionStorage.getItem('sort');
        const storedDiet = sessionStorage.getItem('diet');
        const storedType = sessionStorage.getItem('type');

        if (storedRecipes) setRecipes(JSON.parse(storedRecipes));
        if (storedQuery) setQuery(storedQuery);
        if (storedPage) setPage(Number(storedPage));
        if (storedSort) setSort(storedSort); // 
        if (storedDiet) setDiet(storedDiet); // 
        if (storedType) setType(storedType); // 
        if (!storedRecipes) {
            handleSearch(storedQuery, Number(storedPage));
        }
    }, []);

    const handleSortChange = (event) => {
        setSort(event.target.value);
        setPage(1); // reset page to 1 when sort changes
    };

    const handleSetDiet = (event) => {
        const selectedDiet = event.target.value === "None" ? "" : event.target.value;
        setDiet(selectedDiet);
        setPage(1); // reset page to 1 when diet changes
    };

    const handleSetType = (event) => {
        const selectedType = event.target.value === "None" ? "" : event.target.value;
        setType(selectedType);
        setPage(1); // reset page to 1 when type changes

    }

    const handleSearch = async (searchQuery = query, currentPage = page, currentSort = sort, currentDiet = diet, currentType = type) => {
        setLoading(true);

        const options = {
            method: 'GET',
            url: 'http://localhost:3000/recipes/search',
            params: {
                query: searchQuery,
                sort: currentSort,
                diet: currentDiet,
                type: currentType,
                page: currentPage,
            },
        };

        try {
            const response = await axios.request(options);
            setRecipes(response.data.results);
            sessionStorage.setItem('recipes', JSON.stringify(response.data.results));
            sessionStorage.setItem('query', searchQuery);
            sessionStorage.setItem('page', currentPage.toString());
            sessionStorage.setItem('sort', sort);
            sessionStorage.setItem('diet', diet);
            sessionStorage.setItem('type', type);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const handleNext = () => {
        const newPage = page + 1;
        setPage(newPage);
        sessionStorage.setItem('page', newPage.toString());
        handleSearch(query, newPage); // Trigger a new search with the updated page
    };

    const handlePrev = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            sessionStorage.setItem('page', newPage.toString());
            handleSearch(query, newPage); // Trigger a new search with the updated page
        }
    };

    const performSearch = (searchQuery = query) => {  // Default to current query if not provided
        setPage(1);
        setQuery(searchQuery);
        sessionStorage.removeItem('recipes'); // force a new fetch
        handleSearch(searchQuery, 1, sort, diet, type);  // Explicitly provide all current values
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
            }}>
                <SearchBar onSearch={performSearch} onChange={setQuery} />
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
                            width: '100px'

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
                            width: '100px'

                        }}
                    >
                        {TYPE_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => performSearch()}  // No need to pass query here; it will default to current state
                    style={{ marginTop: '10px', marginLeft: '15px' }}
                >
                    Search
                </Button>
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
                    <CircularProgress />
                </p>
            ) : (
                <>
                    {recipes.length === 0 ? (  // Conditional rendering based on the length of recipes
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
                            No results found.
                        </p>
                    ) : (
                        <>
                            <GridContainer
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
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
                            </GridContainer>
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
                                {!loading && recipes.length >= 10 && (
                                    <Button variant="outlined" onClick={handleNext}>
                                        Next
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ComplexSearch;
