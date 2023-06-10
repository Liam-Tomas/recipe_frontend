import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import Recipe from './Recipe'
import Button from '@mui/material/Button';


const ComplexSearch = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [diets, setDiet] = useState('');
    const [loading, setLoading] = useState(false); // Add a loading state

    useEffect(() => {
        const storedRecipes = sessionStorage.getItem('recipes');
        if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
        }
        else {
            handleSearch(query, page);
        }
    }, [query, page]);

    const handleSearch = async (searchQuery, page = 1) => {
        setLoading(true); // Set loading to true when the request starts
        setQuery(searchQuery); // Update the query
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/recipes/search',
            params: {
                query: searchQuery,
                page: page,
            },
        };


        try {
            const response = await axios.request(options);
            setRecipes(response.data.results);
            sessionStorage.setItem('recipes', JSON.stringify(response.data.results));
        } catch (error) {
            console.error(error);
        }
        setLoading(false); // Set loading to false when the request completes
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
            <SearchBar onSearch={(searchQuery) => { sessionStorage.removeItem('recipes'); handleSearch(searchQuery, 1) }} />
            {loading ? (
                <p style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'red'
                }}>Loading...</p>
            ) : (
                <ul style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    listStyle: 'none',
                    padding: '20px',
                    marginTop: '30px',
                    gap: '25px',
                }}>
                    {recipes.map((recipe) => (
                        <Recipe key={recipe.id} recipe={recipe} />
                    ))}
                </ul>
            )}
            {recipes.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <Button variant="outlined" onClick={handlePrev} disabled={page === 1}>Prev</Button>
                    <Button variant="outlined" onClick={handleNext}>Next</Button>
                </div>
            )}
        </div>
    );
};

export default ComplexSearch;
