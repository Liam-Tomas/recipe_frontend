# Recipe Manager Web Application

## Introduction
Recipe Manager is a React-based web application designed to provide users with an interactive platform for discovering, managing, and saving their favorite recipes. It integrates Firebase for user authentication and utilizes a variety of React components for a dynamic user experience.

## Application Structure

### Core Functionality
- **App.js:** Serves as the entry point of the application, setting up routing with React Router and managing user authentication state with Firebase.
- **FirebaseAuthContext:** Context API implementation for managing Firebase authentication across the application.

### Component Breakdown

#### Layout Components
- **NavBar.js:** Displays the navigation bar, integrating theme toggling and user authentication status.
- **Footer.js:** Renders the application's footer section.

#### User Authentication
- **LoginPage.js, RegisterPage.js:** Handle user login and registration using Firebase authentication.
- **ProfilePage.js:** Allows users to view and edit their profile information.

#### Recipe Exploration
- **ComplexSearch.js:** Enables advanced recipe search with sorting and filtering options, and manages API calls and pagination.
- **SearchBar.js:** Provides an input field for recipe searches.
- **RecipeDetail.js:** Displays detailed information about a specific recipe.

#### Recipe Management
- **CreateRecipeForm.js:** A form for users to add new recipes, including various fields like title, image URL, and dietary options.
- **MyRecipePage.js:** Displays user-submitted recipes and allows for their management.
- **FavoritesPage.js:** Shows a list of the user's favorite recipes and provides functionality to manage them.
- **Recipe.js (in Favorites):** Renders individual recipe cards in the favorites list, including options to add or remove from favorites.

#### Additional Components
- **AboutCards.js:** Offers information cards about the application or user guides.
- **ThemeToggle.js, themeUtils.js, ThemeWrapper.js:** Manage the application's theme settings and UI consistency.

### Technologies and Libraries
- React and React Router for front-end development.
- Firebase for user authentication and data management.
- Material-UI and Styled-Components for UI design.
- Axios for API requests.

## Live Project Link
recipe-finder-foodhub.netlify.app