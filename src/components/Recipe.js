
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { FirebaseAuthContext } from '../FirebaseAuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledRecipe = styled.li`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
  }

  .image-container {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
  }
`;

const Recipe = ({ recipe, showRemove, onRemove }) => {
  const { title, image, sourceUrl, sourceName, readyInMinutes, servings } = recipe;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const currentUser = useContext(FirebaseAuthContext);

  const checkIsFavorite = async () => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/favorites`, {
        headers: {
          'x-user-uid': currentUser.uid,
        }
      });
      const favorites = await response.json();
      const favoriteRecipe = favorites.find(fav => fav.recipeId === recipe.id);

      if (favoriteRecipe) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error checking favorite status: ', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      checkIsFavorite();
    }
  }, [currentUser, recipe.id]);


  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

const addRecipeToFavorites = async () => {
    const userUID = currentUser.uid;
    try {
        const response = await fetch('http://localhost:3000/recipes/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-uid': userUID,
            },
            body: JSON.stringify({
                recipeId: recipe.id,
                title: recipe.title,
                image: recipe.image,
                servings: recipe.servings,
                sourceUrl: recipe.sourceUrl,
                sourceName: recipe.sourceName,
                readyInMinutes: recipe.readyInMinutes
            })
        });
        if (response.ok) {
            setIsFavorite(true);
        } else {
            console.error('Failed to add favorite');
        }
    } catch (error) {
        console.error('Error adding favorite: ', error);
    }
};


  const handleFavoriteClick = () => {
    if (isFavorite) {
        toggleDialog();
    } else {
        // Add to favorites logic if it's not already a favorite.
        addRecipeToFavorites();
    }
};

  const handleRemoveFavorite = async () => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/favorites/${recipe.id}`, {
        method: 'DELETE',
        headers: {
          'x-user-uid': currentUser.uid,
        }
      });
      if (response.ok) {
        setIsFavorite(false); // Update the UI to indicate that this recipe is no longer a favorite.

        if (showRemove) {
          onRemove && onRemove(recipe.id); // Notify parent component (FavoritesPage) to update its state.
        }
      } else {
        console.error('Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error removing favorite: ', error);
    }
  };

  return (
    <div>
      <StyledRecipe>
        <CardActionArea style={{ height: '280px' }}>
          <Link to={sourceUrl} target="_blank" rel="noopener noreferrer">
            <div className="card">
              <div className="image-container">
                <CardMedia component="img" image={image} alt={title} />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '1.25rem' }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By {sourceName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ready in {readyInMinutes} minutes; Serves {servings}
                </Typography>
              </CardContent>
            </div>
          </Link>
        </CardActionArea>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button href={`/recipes/${recipe.id}`} variant="text" style={{ padding: '8px 15px', fontSize: '.84rem' }}>
            Details
          </Button>
          {
            showRemove
              ? <Button color="secondary" onClick={toggleDialog}>Remove</Button>
              : <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={isFavorite}
                onChange={handleFavoriteClick}
              />
          }
        </div>

      </StyledRecipe>
      <Dialog open={showDialog} onClose={toggleDialog}>
        <DialogTitle>Remove Favorite</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you would like to remove it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={async () => {
            await handleRemoveFavorite(); // This will remove the recipe from favorites
            toggleDialog();
          }} color="primary">
            Remove
          </Button>
          <Button onClick={toggleDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Recipe;
