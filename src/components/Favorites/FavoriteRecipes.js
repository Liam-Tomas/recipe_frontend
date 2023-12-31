import React, { useEffect, useState, useContext } from 'react';
import Recipe from './Recipe';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

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

const Title = styled.h1`
    font-size: 2.6rem;
    font-weight: 600;
    margin-bottom: 30px;
    font-family: Inter;

    @media (max-width: 750px) {
        font-size: 2rem;
        margin-bottom: 20px;
      }
`;


const FavoritesContainer = styled.div`
    background: '';
    padding-top: 115px;
    padding-bottom: 75px;
    margin-bottom: 0px;
    margin: 0px 55px;

    @media (max-width: 750px) {
        margin: 0px 15px;
      }
`

const NoFavoritesMessage = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.palette.text.secondary};
  display:flex;
  flex-direction: column;
  justify-content:center;
  min-height:50vh;
  gap:20px;
  font-size:1.3rem;
  @media (max-width: 750px) {
    font-size:.8rem;
    padding:1.5rem;
`;

const FavoriteRecipes = () => {
    const currentUser = useContext(FirebaseAuthContext);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [loading, setLoading] = useState(false); //  loading state
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        // Fetch user's favorite recipes when the page loads
        if (currentUser) {
            setLoading(true); // Start loading
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
        } finally {
            setLoading(false); // Stop loading regardless of the outcome
        }
    };

    const handleFavoriteRemoved = (recipeId) => {
        const updatedFavorites = favoriteRecipes.filter(fav => fav.recipeId !== recipeId);
        setFavoriteRecipes(updatedFavorites);
    };


    return (
        <FavoritesContainer
        >
            <StyledHeaders>
                <Title>
                    Favorites
                </Title>
            </StyledHeaders>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', minHeight: '40vh', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
            ) : favoriteRecipes.length === 0 ? (
                <NoFavoritesMessage>
                        <h1>You haven't added any recipes to favorites yet.</h1>
                        <h3 ><Button component={Link} to="/explore" style={{ fontSize: '18px', marginRight: '0px' }}>Explore</Button> recipes and add them to your favorites!</h3>
                </NoFavoritesMessage>
            ) : (
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
                            showRemove={true}
                            onRemove={handleFavoriteRemoved}
                        />
                    ))}
                </GridContainer>
            )}
        </FavoritesContainer>
    );
};

export default FavoriteRecipes;