import React from 'react';

const FavoritedRecipe = ({ recipe }) => {
  // Display the favorited recipe details
  return (
    <div>
      {/* Display the favorited recipe information */}
      <h3>{recipe.title}</h3>
      {/* Add additional recipe details as needed */}
    </div>
  );
};

export default FavoritedRecipe;
