// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';
// import styled from 'styled-components';
// import Recipe from './Recipe'
// import Button from '@mui/material/Button';


// const ComplexSearch = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [page, setPage] = useState(1);
//     const [query, setQuery] = useState('');
//     const [diets, setDiet] = useState('');
//     const [loading, setLoading] = useState(false); // Add a loading state
//     const [sortOption, setSortOption] = useState('popularity');


//     useEffect(() => {
//         const storedRecipes = sessionStorage.getItem('recipes');
//         if (storedRecipes) {
//             setRecipes(JSON.parse(storedRecipes));
//         }
//         else {
//             handleSearch(query, page);
//         }
//     }, [query, page]);


//     const handleSearch = async (searchQuery, page = 1) => {
//         setLoading(true); // Set loading to true when the request starts
//         setQuery(searchQuery); // Update the query
//         const options = {
//             method: 'GET',
//             url: 'http://localhost:3000/recipes/search',
//             params: {
//                 query: searchQuery,
//                 page: page,
//             },
//         };

//         try {
//             const response = await axios.request(options);
//             console.log(response.data.results)
//             setRecipes(response.data.results);
//             sessionStorage.setItem('recipes', JSON.stringify(response.data.results));
//         } catch (error) {
//             console.error(error);
//         }
//         setLoading(false); // Set loading to false when the request completes
//     };

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
//             <SearchBar
//                 onSearch={(searchQuery) => {
//                     sessionStorage.removeItem('recipes');
//                     handleSearch(searchQuery, 1);
//                 }}
//             />
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import Recipe from './Recipe';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// Add sort options as a constant
const SORT_OPTIONS = ['popularity', 'healthiness', 'price', 'time', 'meta-score'];

const ComplexSearch = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [diets, setDiet] = useState('');
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState(SORT_OPTIONS[0]); // Initialize sort option to 'popularity'

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

    const handleSearch = async (searchQuery, page = 1) => {
        setLoading(true);
        setQuery(searchQuery);
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/recipes/search',
            params: {
                query: searchQuery,
                sort, // add sort option to the request parameters
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
                <FormControl>
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
                            height: '45px',
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
                    Loading...
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
