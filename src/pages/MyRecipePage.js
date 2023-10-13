import React, { useState } from 'react';
import MyRecipe from '../components/MyRecipe';
import styled from 'styled-components';
import { Button, Typography, Modal } from '@mui/material';
import CreateRecipeForm from '../components/CreateRecipeForm';
import MyRecipeCard from '../components/MyRecipeCard'

const StyledHeaders = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MyRecipePage() {

  return (
    <div style={{
      paddingTop: '115px',
      paddingBottom: '75px',
      margin: '0px 55px'
    }}>
      <StyledHeaders>
        <Typography variant="h4" style={{
          fontSize: '2.3rem',
          fontWeight: '500',
        }}>Your Recipes
        </Typography>
      </StyledHeaders>
      <MyRecipe />
    </div>
  );
}

export default MyRecipePage;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Typography } from '@mui/material';
// import RecipeTabs from '../components/RecipeTabs';
// import MyRecipes from '../components/MyRecipe';

// const StyledHeaders = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// function MyRecipePage() {
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const categories = ['All', 'Vegetarian', 'Gluten-Free', 'Vegan', 'Breakfast', 'Dinner', 'Lunch', 'Dessert'];

//   return (
//     <div style={{
//       paddingTop: '115px',
//       paddingBottom: '75px',
//       margin: '0px 55px'
//     }}>
//       <StyledHeaders>
//         <Typography variant="h4" style={{
//           fontSize: '2.1rem',
//           fontWeight: '500',
//         }}>Your Recipes
//         </Typography>
//       </StyledHeaders>
//       <RecipeTabs categories={categories} onCategoryChange={handleCategoryChange} style={{
        
//       }}/>
//       <MyRecipes category={selectedCategory} />
//     </div>
//   );
// }

// export default MyRecipePage;
