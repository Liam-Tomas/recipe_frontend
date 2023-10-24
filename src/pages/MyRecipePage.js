import React, { useState } from 'react';
import MyRecipe from '../components/UserRecipes/MyRecipe';
import styled from 'styled-components';
import { Typography } from '@mui/material';


const StyledHeaders = styled.div`
  display: flex;
align-items: center;
  justify-content: center;
`;

const MyRecipeContainer = styled.div`
  padding-top: 115px;
  padding-bottom: 75px;
  margin: 0px 55px;
`

function MyRecipePage() {

  return (
    <MyRecipeContainer >
      <StyledHeaders>
        <Typography variant="h4" style={{
          fontSize: '2.3rem',
          fontWeight: '500',
        }}>My Recipes
        </Typography>
      </StyledHeaders>
      <MyRecipe />
    </MyRecipeContainer>
  );
}

export default MyRecipePage;

