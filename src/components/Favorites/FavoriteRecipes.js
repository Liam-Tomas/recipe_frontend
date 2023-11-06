import React, { useEffect, useState, useContext } from 'react';
import Recipe from './Recipe';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const StyledHeaders = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 0px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);   
    gap: 25px;
`;

const Title = styled.h1`
    font-size: 2.6rem;
    font-weight: 500;
    padding-bottom: 40px;
    font-family: Inter;
`;

const FavoriteRecipes = () => {
    const currentUser = useContext(FirebaseAuthContext);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        // Fetch user's favorite recipes when the page loads
        if (currentUser) {
            fetchUserFavorites(currentUser.uid);
        }
    }, [currentUser]);

    const fetchUserFavorites = async () => {
        // Make a GET request to fetch user's favorite recipes
        try {
            const response = await fetch(`${API_BASE_URL}/recipes/favorites`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-uid': currentUser.uid,
                },
            });

            if (response.ok) {
                const favorites = await response.json();
                setFavoriteRecipes(favorites);
                console.log(favorites); // Log the fetched favorites
            }
        } catch (error) {
            console.error('Error fetching user favorites:', error);
        }
    };

    const handleFavoriteRemoved = (recipeId) => {
        const updatedFavorites = favoriteRecipes.filter(fav => fav.recipeId !== recipeId);
        setFavoriteRecipes(updatedFavorites);
    };


    return (
        <section
            style={{
                background: '',
                paddingTop: '115px',
                paddingBottom: '75px',
                marginBottom: '0px',
                margin: '0px 55px',
            }}
        >
            <StyledHeaders>
                <Title>
                    Favorites
                </Title>
            </StyledHeaders>

            <GridContainer>
                {favoriteRecipes.map((favorite) => (
                    <Recipe
                        key={favorite.recipeId}
                        recipe={{
                            id: favorite.recipeId, 
                            title: favorite.title,
                            image: favorite.image,
                            servings: favorite.servings,
                            sourceUrl: favorite.sourceUrl, 
                            sourceName: favorite.sourceName,
                            readyInMinutes: favorite.readyInMinutes,
                        }}
                        showRemove={true} // set the showRemove prop to true
                        onRemove={handleFavoriteRemoved}
                    />
                ))}
            </GridContainer>

        </section>
    );
};

export default FavoriteRecipes;