import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';




const StyledRecipe = styled.li`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background-color: white;  

  .card {
    border-radius: 5px;
    padding: 15px;
    // text-align: center;
    // display: flex;
    flex-direction: column;
    // justify-content: space-between;
    // height: 95%;
    cursor: pointer;
    :hover {
      background-color: rgb(243 243 244 / 76%);
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
  const { title, image, sourceUrl, servings, readyInMinutes, aggregateLikes } = recipe;
  // const imageUrl = `https://spoonacular.com/recipeImages/${image}`;

  return (
    <StyledRecipe>
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
        <div className="card">
          <div className="image-container">
            <img src={image} alt={title} />
          </div>
          <Typography gutterBottom variant="h5" component="div">
            {title}</Typography>
          <Typography variant="body2">
            Servings: {servings}, Ready in {readyInMinutes} minutes, {aggregateLikes}</Typography >
          <CardActions>
          </CardActions>

        </div>
      </a>
      <CardActions>
        <Button style={{
        }}
          href={`/recipes/${recipe.id}`} variant="text">Details
        </Button>
      </CardActions>
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
