import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom:30px;
`;

const ImageColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  
  img {
    max-width: 100%;
    height: auto;
    max-height:500px; /* Adjust the height as desired */
  }
`;


const TextColumn = styled.div`
  width:30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function RecipeDetail() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function


  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await axios.get(`http://localhost:3000/recipes/${id}/information`);
      setRecipe(result.data);
    };
    fetchRecipe();
  }, [id]);

  return (
    <Container>
    <DetailsContainer>
      <ImageColumn>
        {recipe.image && <img src={recipe.image} alt={recipe.title || "Book"} />}
      </ImageColumn>
      <TextColumn>
        <h2>{recipe.title || "Title not available"}</h2>
        <p>{recipe.summary || "No summary available"}</p>
        <Button onClick={() => navigate(-1)} variant="contained">Back</Button>

      </TextColumn>
    </DetailsContainer>

  </Container>
  );
}

export default RecipeDetail;
