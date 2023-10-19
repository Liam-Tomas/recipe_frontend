// import React, { useState } from 'react';
// import RecipeDetail from '../components/RecipeDetail'
// import styled from 'styled-components';

// const StyledHeaders = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: white;
//   padding-bottom: 0px;
// `;

// function RecipeFavs() {

//   return (
//     <section style={{
//         // background: 'linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)',
//       // background: 'linear-gradient(to bottom, #f0f2f0, #000c40)',
//       // background: '#f5f7fa',
//       paddingTop: '125px',
//       paddingBottom: '75px',
//       marginBottom: '0px'
//     }}>
//       <StyledHeaders>
//         <h1 style={{
//           fontSize: '2.5rem',
//           color: 'black',
//           fontWeight: '400',
//           margin: '0',
//           padding: '0'
//         }}>View Favorite Recipes</h1>
//         <h2 style={{
//           color: 'black',
//           fontSize: '1.3rem',
//           margin: '0px',
//           fontWeight: '400',
//           padding: '30px'
//         }}>Check out the recipes that you have favorited and click on them to view more information.</h2>
//       </StyledHeaders>
//     </section>
//   );
// }

// export default RecipeFavs;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import FavoritedRecipe from '../components/FavoritedRecipe';

// const StyledHeaders = styled.div`
//   // Styles for headers...
// `;

// function RecipeFavs() {
//   const [favoriteRecipes, setFavoriteRecipes] = useState([]);

//   // Function to handle adding a recipe to favorites
//   const handleFavoriteClick = (recipe) => {
//     // Check if the recipe is already in favorites
//     const isFavorite = favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id);

//     // Add or remove the recipe from favorites based on its current state
//     if (isFavorite) {
//       const updatedFavorites = favoriteRecipes.filter((favRecipe) => favRecipe.id !== recipe.id);
//       setFavoriteRecipes(updatedFavorites);
//     } else {
//       const updatedFavorites = [...favoriteRecipes, recipe];
//       setFavoriteRecipes(updatedFavorites);
//     }
//   };

//   return (
//     <section>
//       <StyledHeaders>
//         {/* Header content... */}
//       </StyledHeaders>

//       {/* Display the favorite recipes */}
//       {favoriteRecipes.map((recipe) => (
//         <FavoritedRecipe key={recipe.id} recipe={recipe} />
//       ))}
//     </section>
//   );
// }

// export default RecipeFavs;
