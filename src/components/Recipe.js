import React from 'react';
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


const StyledRecipe = styled.li`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  .card {
    background-color: ${props => props.theme.palette.background.paper};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
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
  }

`;

const Recipe = ({ recipe }) => {
  const { title, image, sourceUrl, servings, readyInMinutes, aggregateLikes, sourceName, diets } = recipe;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const theme = useTheme();


  const handleFavoriteClick = () => {
    // Send a request to the backend API to add or remove the recipe from favorites
    fetch('/api/favorites', {
      method: 'POST',
      body: JSON.stringify({ recipeId: recipe.id, isFavorite: !recipe.isFavorite }), // Adjust the payload as per your backend API requirements
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary authorization headers
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, update the frontend state or display a success message
        } else {
          // Handle error, display an error message
        }
      })
      .catch((error) => {
        // Handle error, display an error message
      });
  };
  return (
    <StyledRecipe sx={{ maxWidth: 345 }}>
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
                By {sourceName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Ready in {readyInMinutes} minutes; Serves {servings}
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
        }}>Details</Button>
        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} style={{
        }} />

      </div>
    </StyledRecipe>
  );
};

export default Recipe;



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
