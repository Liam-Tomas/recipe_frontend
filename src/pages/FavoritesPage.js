import React, { useEffect, useState, useContext } from 'react';
import Recipe from '../components/Recipe';
import { FirebaseAuthContext } from '../FirebaseAuthContext';
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

const FavoritesPage = () => {
    const currentUser = useContext(FirebaseAuthContext);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        // Fetch user's favorite recipes when the page loads
        if (currentUser) {
            fetchUserFavorites(currentUser.uid);
        }
    }, [currentUser]);

    const fetchUserFavorites = async () => {
        // Make a GET request to fetch user's favorite recipes
        try {
            const response = await fetch('http://localhost:3000/recipes/favorites', {
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
                <Typography
                    variant="h4"
                    style={{
                        fontSize: '2.3rem',
                        fontWeight: '500',
                        paddingBottom: '40px',
                    }}
                >
                    Favorites
                </Typography>
            </StyledHeaders>

            <GridContainer>
                {favoriteRecipes.map((favorite) => (
                    <Recipe
                        key={favorite.recipeId}
                        recipe={{
                            id: favorite.recipeId, // Ensure this line exists and is correct
                            title: favorite.title,
                            image: favorite.image,
                            servings: favorite.servings,
                            sourceUrl: favorite.sourceUrl, 
                            sourceName: favorite.sourceName,
                            readyInMinutes: favorite.readyInMinutes,
                            // Include other properties as needed
                        }}
                        showRemove={true} // set the showRemove prop to true
                        onRemove={handleFavoriteRemoved}
                    />
                ))}
            </GridContainer>

        </section>
    );
};

export default FavoritesPage;
