import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { FirebaseAuthContext } from '../FirebaseAuthContext';
import EditRecipeForm from './EditRecipeForm';
import Modal from '@mui/material/Modal';

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

const MyRecipeCard = ({ recipe, onRemove, onEdit }) => {
  const { title, image, sourceUrl, servings, preparationMinutes, summary, vegetarian, aggregateLikes, sourceName, diets } = recipe;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const currentUser = useContext(FirebaseAuthContext);
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                {summary}
              </Typography>
              <Typography variant="body2" color="primary">
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
        <Button onClick={() => {
          setSelectedRecipe(recipe);  // Set the selected recipe
          handleOpen();              // Open the edit modal
        }} variant="text" style={{
          padding: '8px 15px',
          fontSize: '.84rem'
        }}>Edit</Button>
        <Button color="secondary" onClick={removeRecipe}>Remove</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-recipe-title"
        aria-describedby="edit-recipe-description"
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <EditRecipeForm initialRecipe={selectedRecipe} onRecipeUpdate={onEdit} onClose={handleClose} />
        </div>
      </Modal>

    </StyledRecipe>
  );
};

export default MyRecipeCard;
