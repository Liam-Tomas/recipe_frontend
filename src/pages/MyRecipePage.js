import React from 'react';
import MyRecipe from '../components/MyRecipe'; // Make sure to import the correct component

function MyRecipePage() {
    return (
        <div>
            <MyRecipe /> {/* Use MyRecipes instead of CreateRecipe */}
        </div>
    );
}

export default MyRecipePage;
