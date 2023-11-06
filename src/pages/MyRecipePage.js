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

const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 600;
  font-family: Inter;
  margin-bottom: 10px;
`

function MyRecipePage() {

  return (
    <MyRecipeContainer >
      <StyledHeaders>
        <Title>My Recipes
        </Title>
      </StyledHeaders>
      <MyRecipe />
    </MyRecipeContainer>
  );
}

export default MyRecipePage;

