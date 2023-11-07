import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  margin: 100px 200px;
  text-align: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom:15px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin: 0;
`;

const SourceButton = styled(Button)`
  margin: 20px 0;
`;

const ImageKeyValueContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: center;
  margin: 20px 0;

`;

const RecipeImage = styled.img`
  height: auto;
  max-width: 50%;
  margin-right: 20px;
`;

const KeyValueContainer = styled.div`
  text-align: left;
`;

const KeyValue = styled.p`
  margin: 0 0 10px 0;
  font-size: 1.5rem;
`;

const Summary = styled.p`
  margin-right: 200px;
  width: 100%;
  font-size: 23px;
  text-align: left;
  padding: 10px;
`;

const Instructions = styled.div`
  text-align: left;
  font-size: 23px;  

  h3 {
    display:flex;
    justify-content:center;
  }
`;

const InstructionStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
`;

const InstructionNumber = styled.span`
  font-weight: bold;
  margin-right: 10px;
  font-size: 24px;
`;

const ContentContainer = styled.div`
  padding: 20px;
`

function RecipeDetail() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/recipes/${id}/information`);
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  const removeHtmlTags = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '90vh', alignItems: 'center' }}>
        <CircularProgress fontSize='2rem' />
      </div>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <Title>{recipe.title || 'Title not available'}</Title>
        {recipe.sourceName && <SourceButton href={recipe.sourceUrl} variant="outlined" target="_blank" rel="noopener noreferrer">Source: {recipe.sourceName}</SourceButton>}
      </TitleContainer>
      <ContentContainer>
        <ImageKeyValueContainer>
          {recipe.image && <RecipeImage src={recipe.image} alt={recipe.title || 'Recipe'} />}
          <KeyValueContainer>
            <KeyValue>Very Healthy: {recipe.veryHealthy ? 'Yes' : 'No'}</KeyValue>
            <KeyValue>Very Popular: {recipe.veryPopular ? 'Yes' : 'No'}</KeyValue>
            <KeyValue>Cuisine(s): {recipe.cuisines?.join(', ') || 'No cuisine information'}</KeyValue>
            <KeyValue>Preparation Time: {recipe.preparationMinutes || 'N/A'} minutes</KeyValue>
            <KeyValue>Cooking Time: {recipe.cookingMinutes || 'N/A'} minutes</KeyValue>
            <KeyValue>Likes: {recipe.aggregateLikes || 0}</KeyValue>
            <KeyValue>Health Score: {recipe.healthScore || 0}</KeyValue>
          </KeyValueContainer>
        </ImageKeyValueContainer>
        <Summary>{removeHtmlTags(recipe.summary) || 'No summary available'}</Summary>
        <Instructions>
          <h3>Instructions:</h3>
          {recipe.analyzedInstructions?.[0]?.steps.map((step) => (
            <InstructionStep key={step.number}>
              <InstructionNumber>{step.number}.</InstructionNumber>
              <span>{step.step}</span>
            </InstructionStep>
          ))}
        </Instructions>
      </ContentContainer>
      <Button onClick={() => navigate(-1)} variant="contained" style={{ marginTop: '50px' }}>
        Back
      </Button>
    </Container>
  );
}

export default RecipeDetail;
