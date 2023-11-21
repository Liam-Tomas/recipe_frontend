import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Recipe from '../Favorites/Recipe';
import { Button, CircularProgress } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    // grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); // Responsive layout
    list-style: none;
    margin: 30px 10px;
    gap: 25px;

    @media (max-width: 1300px) {
        grid-template-columns: repeat(3, 1fr); // 2 columns on smaller screens
    }

    @media (max-width: 868px) {
        grid-template-columns: repeat(2, 1fr); // 2 columns on smaller screens
    }

    @media (max-width: 750px) {
        grid-template-columns: repeat(1, 1fr); // 2 columns on smaller screens
        padding: 0px;
    }
`;

const ExploreContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 768px) {
        gap: .1rem;
        display: flex;
        align-items: left;
        justify-content: left; 
    }
`;


const PaginationContainer = styled.div`
    display: flex;
    justify-content:center;
    gap: 1rem;
    margin-top: 1rem;
`;


const StyledSelect = styled(Select)`
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
    @media (max-width: 768px) {
        display: none !important;
    }
`;


const SearchButton = styled(Button)`
    margin-left: 15px;
    @media (max-width: 768px) {
        height: 47px;
    }
`;


// Options for sorting, diet, and type selection
const SORT_OPTIONS = ['popularity', 'healthiness', 'price', 'time', 'meta-score'];
const DIET_OPTIONS = ['none', 'vegetarian', 'gluten free', 'vegan', 'paleo', 'whole30'];
const TYPE_OPTIONS = ['none', 'main course', 'breakfast', 'appetizer', 'salad', 'dessert'];

// Constant for number of results to show per page
const RESULTS_PER_PAGE = 10;

// API B
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ComplexSearch = () => {
    // State hooks for various pieces of data and UI states
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState(SORT_OPTIONS[0]);
    const [diet, setDiet] = useState(DIET_OPTIONS[0]);
    const [type, setType] = useState(TYPE_OPTIONS[0]);

    // Retrieve data from session storage on initial render
    useEffect(() => {
        // Get data from session storage
        const storedQuery = sessionStorage.getItem('query');
        const storedPage = sessionStorage.getItem('page');
        const storedRecipes = sessionStorage.getItem('recipes');
        const storedSort = sessionStorage.getItem('sort');
        const storedDiet = sessionStorage.getItem('diet');
        const storedType = sessionStorage.getItem('type');
        // Load previous state if available
        if (storedRecipes) setRecipes(JSON.parse(storedRecipes));
        if (storedQuery) setQuery(storedQuery);
        if (storedPage) setPage(Number(storedPage));
        if (storedSort) setSort(storedSort); // 
        if (storedDiet) setDiet(storedDiet); // 
        if (storedType) setType(storedType); // 
        // If previous search results aren't stored, fetch them
        if (!storedRecipes) {
            handleSearch(storedQuery, Number(storedPage));
        }
    }, []);

    const handleSortChange = (event) => {
        setSort(event.target.value);
        setPage(1); // reset page to 1 when sort changes
        sessionStorage.removeItem('recipes');

    };
    const handleSetDiet = (event) => {
        const selectedDiet = event.target.value === "none" ? "" : event.target.value;
        setDiet(selectedDiet);
        setPage(1); // reset page to 1 when diet changes
        sessionStorage.removeItem('recipes');

    };
    const handleSetType = (event) => {
        const selectedType = event.target.value === "none" ? "" : event.target.value;
        setType(selectedType);
        setPage(1); // reset page to 1 when type changes
        sessionStorage.removeItem('recipes');
    }

    // Function to handle the search request
    const handleSearch = async (searchQuery = query, currentPage = page, currentSort = sort, currentDiet = diet, currentType = type) => {
        // Indicate the start of an API call
        setLoading(true);

        // Set up API request details
        const options = {
            method: 'GET',
            url: `${API_BASE_URL}/recipes/search`,
            params: {
                query: searchQuery,
                sort: currentSort,
                diet: currentDiet,
                type: currentType,
                page: currentPage,
            },
        };
        // Perform the API call
        try {
            const response = await axios.request(options);
            // Save fetched data in the state and session storage
            setRecipes(response.data.results);
            sessionStorage.setItem('recipes', JSON.stringify(response.data.results));
            sessionStorage.setItem('query', searchQuery);
            sessionStorage.setItem('page', currentPage.toString());
            sessionStorage.setItem('sort', sort);
            sessionStorage.setItem('diet', diet);
            sessionStorage.setItem('type', type);
        } catch (error) {
            console.error(error);
        } finally {
            // Indicate the end of an API call regardless of the outcome
            setLoading(false);
        }
        // setLoading(false);
    };

    // Functions for navigating through paginated results
    const handleNext = () => {
        const newPage = page + 1;
        setPage(newPage);
        sessionStorage.setItem('page', newPage.toString());
        handleSearch(query, newPage, sort, diet, type);
    };
    const handlePrev = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            sessionStorage.setItem('page', newPage.toString());
            handleSearch(query, newPage, sort, diet, type);
        }
    };

    // Function to perform a search when the search button is clicked
    const performSearch = (searchQuery = query) => {  // Default to current query if not provided
        setPage(1);
        setQuery(searchQuery);
        sessionStorage.removeItem('recipes'); // force a new fetch
        handleSearch(searchQuery, 1, sort, diet, type);  // Explicitly provide all current values
    };

    // Render the search UI and search results
    return (
        <div>
            <ExploreContainer>
                <SearchBar onSearch={performSearch} onChange={setQuery} />
                <FormControl size="small">
                    <InputLabel id="sort-label" style={{
                        marginTop: '10px'
                    }}>Sort By</InputLabel>
                    <StyledSelect
                        labelId="sort-label"
                        id="sort-select"
                        value={sort}
                        onChange={handleSortChange}
                        label="Sort By"
                        
                    >
                        {SORT_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="diet-label" style={{
                        marginTop: '10px'
                    }}>Diet</InputLabel>
                    <StyledSelect
                        labelId="diet-label"
                        id="diet-select"
                        value={diet}
                        onChange={handleSetDiet}
                        label="Diet"
                    >
                        {DIET_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="diet-label" style={{
                        marginTop: '10px'
                    }}>Type</InputLabel>
                    <StyledSelect
                        labelId="type-label"
                        id="type-select"
                        value={type}
                        onChange={handleSetType}
                        label="Diet"
                    >
                        {TYPE_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>
                <SearchButton
                    variant="outlined"
                    color="primary"
                    onClick={() => performSearch()}  // No need to pass query; it will default to current state
                >
                    Search
                </SearchButton>
            </ExploreContainer>
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
                            <GridContainer>
                                {recipes.map((recipe) => (
                                    <Recipe key={recipe.id} recipe={recipe} />
                                ))}
                            </GridContainer>
                            <PaginationContainer
                                
                            >
                                {!loading && page !== 1 && (
                                    <Button variant="outlined" onClick={handlePrev} disabled={page === 1}>
                                        Prev
                                    </Button>
                                )}
                                {!loading && recipes.length >= RESULTS_PER_PAGE && (
                                    <Button variant="outlined" onClick={handleNext}>
                                        Next
                                    </Button>
                                )}
                            </PaginationContainer>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ComplexSearch;
