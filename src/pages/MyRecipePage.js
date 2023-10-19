import React, { useState } from 'react';
import MyRecipe from '../components/MyRecipe';
import styled from 'styled-components';
import { Button, Typography, Modal } from '@mui/material';
import CreateRecipeForm from '../components/CreateRecipeForm';
import MyRecipeCard from '../components/MyRecipeCard'

const StyledHeaders = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MyRecipePage() {

  return (
    <div style={{
      paddingTop: '115px',
      paddingBottom: '75px',
      margin: '0px 55px'
    }}>
      <StyledHeaders>
        <Typography variant="h4" style={{
          fontSize: '2.3rem',
          fontWeight: '500',
        }}>My Recipes
        </Typography>
      </StyledHeaders>
      <MyRecipe />
    </div>
  );
}

export default MyRecipePage;

