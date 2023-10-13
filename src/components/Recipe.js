// import React, { useEffect, useState, useContext } from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { Button, CardActionArea, CardActions } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardMedia from '@mui/material/CardMedia';
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import { FirebaseAuthContext } from '../FirebaseAuthContext';
// // Import necessary components for the dialog
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// const StyledRecipe = styled.li`
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
//   border-radius:5px;
//   max-width: 350px;

//   .card {
//     background-color: ${props => props.theme.palette.background.paper};
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     height: 100%;
//     border-top-left-radius:5px;
//     border-top-right-radius:5px;
//     cursor: pointer;
//   }

//   .image-container {
//     height: 200px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     overflow: hidden;
//     border-top-left-radius:5px;
//     border-top-right-radius:5px;
//   }
// `;

// const Recipe = ({ recipe }) => {
//   const { title, image, sourceUrl, sourceName, readyInMinutes, servings } = recipe;
//   const [isFavorite, setIsFavorite] = useState(false);
//   const currentUser = useContext(FirebaseAuthContext);
//   // At the beginning of your Recipe component, after defining isFavorite and currentUser: 
//   const [showDialog, setShowDialog] = useState(false);


//   const toggleDialog = () => {
//     setShowDialog(!showDialog);
//   };

//   console.log("Current User from Recipe Component:", currentUser);

//   const handleFavoriteClick = async () => {
//     if (!currentUser) {
//       console.error('No user is logged in');
//       return;
//     }

//     const userUID = currentUser.uid;

//     // Check if it's already a favorite or not
//     const isRecipeFavorite = isFavorite;

//     try {
//       let method, endpoint;

//       if (isRecipeFavorite) {
//         // If it's a favorite, send a DELETE request to remove it
//         method = 'DELETE';
//         endpoint = `http://localhost:3000/recipes/favorites/${recipe.id}`;
//       } else {
//         // If it's not a favorite, send a POST request to add it
//         method = 'POST';
//         endpoint = 'http://localhost:3000/recipes/favorites';

//       }

//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'x-user-uid': userUID,
//         },
//         body: JSON.stringify({ 
//           recipeId: recipe.id, 
//           title: recipe.title, 
//           image: recipe.image,
//           servings: recipe.servings }) // Include title and image

//       });

//       if (response.ok) {
//         setIsFavorite(!isFavorite); // Toggle the state of the favorite
//       } else {
//         console.error(`Failed to ${isRecipeFavorite ? 'remove' : 'add'} favorite`);
//       }
//     } catch (error) {
//       console.error(`Error ${isRecipeFavorite ? 'removing' : 'adding'} favorite: `, error);
//     }
//   };




//   return (
//     <div>
//     <StyledRecipe>
//       <CardActionArea style={{ height: '280px' }}>
//         <Link to={sourceUrl} target="_blank" rel="noopener noreferrer">
//           <div className="card">
//             <div className="image-container">
//               <CardMedia component="img" image={image} alt={title} />
//             </div>
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '1.25rem' }}>
//                 {title}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 By {sourceName}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Ready in {readyInMinutes} minutes; Serves: {servings}
//               </Typography>
//             </CardContent>
//           </div>
//         </Link>
//       </CardActionArea>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Button href={`/recipes/${recipe.id}`} variant="text" style={{ padding: '8px 15px', fontSize: '.84rem' }}>
//           Details
//         </Button>
//         <Checkbox 
//           icon={<FavoriteBorder />} 
//           checkedIcon={<Favorite />} 
//           checked={isFavorite}
//           onChange={handleFavoriteClick} 
//         />
//       </div>
//     </StyledRecipe>
//     <Dialog open={showDialog} onClose={toggleDialog}>
//         <DialogTitle>Already Favorited</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             You have already marked this recipe as a favorite.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={toggleDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Recipe;





// import React from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { Button, CardActionArea, CardActions } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardMedia from '@mui/material/CardMedia';
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import { useTheme } from '@mui/material/styles';


// const StyledRecipe = styled.li`
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
//   // box-shadow: rgba(33, 35, 39, 0.08) 0px 8px 24px;
//   border-radius:5px;
//   max-width: 350px;
//   .card {
//     background-color: ${props => props.theme.palette.background.paper};
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     height: 100%;
//     border-top-left-radius:5px;
//     border-top-right-radius:5px;
//     cursor: pointer;
//     :hover {
//       background-color: ;
//     }
//   }

//   .image-container {
//     height: 200px; /* Adjust the height as needed */
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     overflow: hidden;
//     border-top-left-radius:5px;
//     border-top-right-radius:5px;

//   }

// `;

// const Recipe = ({ recipe }) => {
//   const { title, image, sourceUrl, servings, readyInMinutes, aggregateLikes, sourceName, diets } = recipe;
//   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//   const theme = useTheme();


//   const handleFavoriteClick = () => {
//     // Send a request to the backend API to add or remove the recipe from favorites
//     fetch('/api/favorites', {
//       method: 'POST',
//       body: JSON.stringify({ recipeId: recipe.id, isFavorite: !recipe.isFavorite }), // Adjust the payload as per your backend API requirements
//       headers: {
//         'Content-Type': 'application/json',
//         // Include any necessary authorization headers
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           // Handle success, update the frontend state or display a success message
//         } else {
//           // Handle error, display an error message
//         }
//       })
//       .catch((error) => {
//         // Handle error, display an error message
//       });
//   };
//   return (
//     <StyledRecipe>
//       <CardActionArea style={{
//         height: '280px'
//       }}>
//         <Link to={sourceUrl} target="_blank" rel="noopener noreferrer">
//           <div className="card">
//             <div className="image-container">
//               <CardMedia
//                 component="img"
//                 image={image}
//                 alt={title}
//               />
//             </div>
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div" style={{
//                 fontSize: '1.25rem'
//               }}>
//                 {title}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 By {sourceName}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Ready in {readyInMinutes} minutes; Serves {servings}
//               </Typography>
//             </CardContent>
//           </div>
//         </Link>
//       </CardActionArea>
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between'
//       }}>
//         <Button href={`/recipes/${recipe.id}`} variant="text" style={{
//           padding: '8px 15px',
//           fontSize: '.84rem'
//         }}>Details</Button>
//         <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} style={{
//         }} />

//       </div>
//     </StyledRecipe>
//   );
// };

// export default Recipe;



// import React from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { Button, CardActionArea, CardActions } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardMedia from '@mui/material/CardMedia';



// const StyledRecipe = styled.li`
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;  

//   .card {
//     background-color: white;
//     border-radius: 5px;
//     padding: 10px;
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     height: 95%;
//     cursor: pointer;
//     :hover {
//       background-color: rgb(243 243 244 / 76%);
//     }
//   }

//   .image-container {
//     height: 200px; /* Adjust the height as needed */
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     overflow: hidden;
//   }

// `;

// const Recipe = ({ recipe }) => {
//   const { title, image, sourceUrl, servings, readyInMinutes, aggregateLikes } = recipe;
//   // const imageUrl = `https://spoonacular.com/recipeImages/${image}`;

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
//           <CardMedia
//             component="img"
//             height="140"
//             image={image}
//             alt={title}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Servings: {servings}, Ready in {readyInMinutes} minutes, {aggregateLikes}
//             </Typography>
//           </CardContent>
//           <CardActions>

//             <Button href={`/recipes/${recipe.id}`} variant="text">Details</Button>
//           </CardActions>
//         </a>
//       </CardActionArea>

//     </Card>
//   );
// };

// export default Recipe;




// import React, { useState, useEffect, useContext } from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { Button, CardActionArea } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardMedia from '@mui/material/CardMedia';
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import { FirebaseAuthContext } from '../FirebaseAuthContext';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// const StyledRecipe = styled.li`
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
//   border-radius:5px;
//   max-width: 350px;

//   .card {
//     background-color: ${props => props.theme.palette.background.paper};
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     height: 100%;
//     border-top-left-radius:5px;
//     border-top-right-radius:5px;
//     cursor: pointer;
//   }

//   .image-container {
//     height: 200px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     overflow: hidden;
//     border-top-left-radius:5px;
//     border-top-right-radius:5px;
//   }
// `;

// const Recipe = ({ recipe, showRemove, onRemove }) => {
//   const { title, image, sourceUrl, sourceName, readyInMinutes, servings } = recipe;
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);
//   const currentUser = useContext(FirebaseAuthContext);

//   const checkIsFavorite = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/recipes/favorites`, {
//         headers: {
//           'x-user-uid': currentUser.uid,
//         }
//       });

//       const favorites = await response.json();

//       const favoriteRecipe = favorites.find(fav => fav.recipeId === recipe.id);
//       if (favoriteRecipe) {
//         setIsFavorite(true);
//       }

//     } catch (error) {
//       console.error('Error checking favorite status: ', error);
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       checkIsFavorite();

//     }
//   }, [currentUser, recipe.id]);


//   const toggleDialog = () => {
//     setShowDialog(!showDialog);
//   };

//   const handleFavoriteClick = async () => {
//     if (!currentUser) {
//       console.error('No user is logged in');
//       return;
//     }

//     if (isFavorite) {
//       toggleDialog();
//       return
//     }

//     const userUID = currentUser.uid;

//     try {
//       let method, endpoint;

//       if (isFavorite) {

//         method = 'DELETE';
//         endpoint = `http://localhost:3000/recipes/favorites/${recipe.id}`;
//       } else {
//         method = 'POST';
//         endpoint = 'http://localhost:3000/recipes/favorites';
//       }

//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'x-user-uid': userUID,
//         },
//         body: JSON.stringify({
//           recipeId: recipe.id,
//           title: recipe.title,
//           image: recipe.image,
//           servings: recipe.servings
//         })
//       });

//       if (response.ok) {
//         setIsFavorite(!isFavorite);
//       } else {
//         console.error(`Failed to ${isFavorite ? 'remove' : 'add'} favorite`);
//       }
//     } catch (error) {
//       console.error(`Error ${isFavorite ? 'removing' : 'adding'} favorite: `, error);
//     }
//   };

//   const handleRemoveFavorite = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/recipes/favorites/${recipe.id}`, {
//         method: 'DELETE',
//         headers: {
//           'x-user-uid': currentUser.uid,
//         }
//       });
//       if (response.ok) {
//         setIsFavorite(false); // Update the UI to indicate that this recipe is no longer a favorite.
//         if (showRemove) {
//           onRemove && onRemove(recipe.id);
//         }
//         if (showRemove) {
//           onRemove && onRemove(recipe.id); // Notify parent component (FavoritesPage) to update its state.
//         }
//       } else {
//         console.error('Failed to remove favorite');
//       }
//     } catch (error) {
//       console.error('Error removing favorite: ', error);
//     }
//   };

//   return (
//     <div>
//       <StyledRecipe>
//         <CardActionArea style={{ height: '280px' }}>
//           <Link to={sourceUrl} target="_blank" rel="noopener noreferrer">
//             <div className="card">
//               <div className="image-container">
//                 <CardMedia component="img" image={image} alt={title} />
//               </div>
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '1.25rem' }}>
//                   {title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   By {sourceName}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Ready in {readyInMinutes} minutes; Serves: {servings}
//                 </Typography>
//               </CardContent>
//             </div>
//           </Link>
//         </CardActionArea>
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Button href={`/recipes/${recipe.id}`} variant="text" style={{ padding: '8px 15px', fontSize: '.84rem' }}>
//             Details
//           </Button>
//           {
//             showRemove
//               ? <Button color="secondary" onClick={handleRemoveFavorite}>Remove</Button>
//               : <Checkbox
//                 icon={<FavoriteBorder />}
//                 checkedIcon={<Favorite />}
//                 checked={isFavorite}
//                 onChange={handleFavoriteClick}
//               />
//           }
//         </div>

//       </StyledRecipe>
//       <Dialog open={showDialog} onClose={toggleDialog}>
//         <DialogTitle>Already Favorited</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Would you like to remove from favorites?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={async () => {
//             await handleRemoveFavorite(); // This will remove the recipe from favorites
//             toggleDialog();
//           }} color="primary">
//             Remove
//           </Button>
//           <Button onClick={toggleDialog} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//     </div>
//   );
// };

// export default Recipe;




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
                sourceUrl: recipe.sourceUrl
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
                  Ready in {readyInMinutes} minutes; Serves: {servings}
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
