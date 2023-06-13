import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  margin: 100px 200px;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  justify-self: start;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:100px;
  gap: 20px;
  justify-self: start;
`;

const RecipeTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const RecipeImage = styled.img`
  height: auto;
  max-height: 500px;
`;

const Stat = styled.p`
  margin: 0;
`;

const Summary = styled.p`
  margin-right: 200px;
  width: 100%;
`;

const Instructions = styled.div`
  margin-top: 20px;
  grid-column: 1 / span 2;
`;

const InstructionStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const InstructionNumber = styled.p`
  font-weight: bold;
  margin: 0;
`;

const InstructionText = styled.p`
  margin: 0;
`;

function RecipeDetail() {
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/recipes/${id}/information`);
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
                <CircularProgress fontSize='2rem'/> 
            </div>
        );
    }

    return (
        <Container>
            <ContentContainer>
                <LeftColumn>
                    <RecipeTitle>{recipe.title || 'Title not available'}</RecipeTitle>
                    {recipe.image && <RecipeImage src={recipe.image} alt={recipe.title || 'Recipe'} />}
                </LeftColumn>
                <RightColumn>
                    <Stat>Very Healthy: {recipe.veryHealthy ? 'Yes' : 'No'}</Stat>
                    <Stat>Very Popular: {recipe.veryPopular ? 'Yes' : 'No'}</Stat>
                    <Stat>Cuisine(s): {recipe.cuisines?.join(', ') || 'No cuisine information'}</Stat>
                    <Stat>Preparation Time: {recipe.preparationMinutes || 'N/A'} minutes</Stat>
                    <Stat>Cooking Time: {recipe.cookingMinutes || 'N/A'} minutes</Stat>
                    <Stat>Aggregate Likes: {recipe.aggregateLikes || 0}</Stat>
                    <Stat>Health Score: {recipe.healthScore || 0}</Stat>
                    <Stat>Source: {recipe.sourceName || 'Unknown'}</Stat>
                </RightColumn>
            </ContentContainer>
      <Summary>{removeHtmlTags(recipe.summary) || 'No summary available'}</Summary>
            <Instructions>
                <h3>Instructions:</h3>
                {recipe.analyzedInstructions?.[0]?.steps.map((step) => (
                    <InstructionStep key={step.number}>
                        <InstructionNumber>{step.number}.</InstructionNumber>
                        <InstructionText>{step.step}</InstructionText>
                    </InstructionStep>
                ))}
            </Instructions>
            <Button onClick={() => navigate(-1)} variant="contained">
                Back
            </Button>
        </Container>
    );
}

export default RecipeDetail;
