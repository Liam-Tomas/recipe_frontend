import React, { useState } from 'react';
import FavoriteRecipes from '../components/Favorites/FavoriteRecipes';
import styled from 'styled-components';

const Title = styled.h1`

`
const StyledHeaders = styled.div`
 
`;

function FavoritesPage() {

    return (
        <div>
            <StyledHeaders>
            </StyledHeaders>
            <FavoriteRecipes />
        </div>
    );
}

export default FavoritesPage;
