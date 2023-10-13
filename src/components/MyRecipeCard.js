import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { FirebaseAuthContext } from '../FirebaseAuthContext';


const StyledRecipe = styled.li`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  // box-shadow: rgba(33, 35, 39, 0.08) 0px 8px 24px;
  border-radius:5px;
  max-width: 350px;
  .card {
    background-color: ${props => props.theme.palette.background.paper};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    cursor: pointer;
    :hover {
      background-color: ;
    }
  }

  .image-container {
    height: 200px; /* Adjust the height as needed */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    
  }

`;

const MyRecipeCard = ({ recipe, onRemove }) => {
  const { title, image, sourceUrl, servings, preparationMinutes, aggregateLikes, sourceName, diets } = recipe;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const theme = useTheme();
  const currentUser = useContext(FirebaseAuthContext);

  const removeRecipe = () => {
    onRemove(recipe._id); // Call the passed down function with the recipe ID
};

  return (
    <StyledRecipe>
      <CardActionArea style={{
        height: '280px'
      }}>
        <Link to={sourceUrl} target="_blank" rel="noopener noreferrer">
          <div className="card">
            <div className="image-container">
              <CardMedia
                component="img"
                image={image}
                alt={title}
              />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{
                fontSize: '1.25rem'
              }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By Liam 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ready in {preparationMinutes} minutes; Serves {servings}
              </Typography>
            </CardContent>
          </div>
        </Link>
      </CardActionArea>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Button href={`/recipes/${recipe.id}`} variant="text" style={{
          padding: '8px 15px',
          fontSize: '.84rem'
        }}>Edit</Button>
        <Button color="secondary" onClick={removeRecipe}>Remove</Button>
      </div>
    </StyledRecipe>
  );
};

export default MyRecipeCard;
