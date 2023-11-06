// The Recipe Finder app is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application
//  that showcases my skills in building robust and scalable web applications. The app allows users
//   to explore and discover various recipes, providing a seamless recipe search experience. The 
//   backend of the app is built with Node.js and Express.js, providing RESTful API endpoints for
//    handling recipe data and user interactions. MongoDB is used as the database for storing recipe
//     information. On the frontend, the app utilizes React.js for building the user interface, React
//      Router for handling client-side routing, and Material-UI for a modern and responsive design. 
//      The app features a navigation bar, a homepage component for introducing the app, an explore page
//       for browsing recipes, and a recipe detail page for displaying detailed information about a
//        specific recipe. With the integration of styled-components, the app offers custom styling 
//        for a visually appealing user experience. The Recipe Finder app demonstrates my ability to
//         develop full-stack applications, leveraging the MERN stack to deliver an interactive and 
//         feature-rich application for recipe enthusiasts.


// Welcome to Recipe Tracker, a platform that revolutionizes the way you 
// discover and explore recipes. The app provides a seamless recipe 
// search experience, allowing you to find the perfect dishes quickly
//  and effortlessly.

// This site is a full-stack MERN application,
//  utilizing Node.js, Express.js, MongoDB, React.js, React Router, 
//  and Material-UI. It provides API endpoints for recipe data and user
//   interactions, with MongoDB as the database and a modern UI design.

// Welcome to FoodieHub, a platform that provides a seamless recipe
// search experience, allowing you to find the perfect dishes quickly and effortlessly. 
// Our site also allows you to save recipes to your favorites, create your own recipes, 
// and share them with friends.

// Welcome to FoodieHub! Discover and save your favorite recipes with ease,
// create and share your own recipes with friends, and enjoy a seamless recipe search experience.

import { Button } from '@mui/material';
import React, { useContext } from 'react';
import styled from 'styled-components';
import AboutCards from '../components/Cards/AboutCards'
import { Typography } from '@mui/material';
import HomePic from '../images/home_image1.svg'
import HomePic2 from '../images/home_image2.svg'
import { FirebaseAuthContext } from '../FirebaseAuthContext';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';



const Container = styled.div`
  display: flex;
  align-items:center;
  // text-align: center;
  justify-content: center;
  flex-direction: column;
  height: 85vh;
  padding: 0px 30px;
  gap: 15px;
  // backgroundImage: 'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
  // background-image: linear-gradient(to bottom, #dfe9f3 0%, white 100%);
  ;
`;


const Title = styled.div`
font-size: 1.95rem;
font-weight: 500;
// font-family: 'Inter';
color: ${(props) => props.theme.palette.primary.main};

`;

const Subtitle = styled.div`
  font-size: 1.5rem;
  font-family: 'Inter';
  margin-bottom: 15px;
  color: ${(props) => props.theme.palette.text.secondary};
  `;

const Image = styled.img`
  max-width:0%;
  top:20%;
  right:3%;
  position: absolute;
  z-index: -10;
`;

const Image2 = styled.img`
  max-width: 0%;
  top: 300px;
  right: 8%;
  position: absolute;
`;

const GetStartedBtn = styled.div`
  display: flex;
  justify-content: center;
  alignItems: center;
  padding:180px;
  `

const MainTitle = styled.div`
  font-size: 3.9rem;
  font-weight: 700;
  font-family: 'Inter';
`

const ColoredTitle = styled.span`
  color: ${(props) => props.theme.palette.primary.main};

`

const HomePage = () => {
  const recipePhoto = 'https://spoonacular.com/application/frontend/images/food-api/ontology2.svg';
  const currentUser = useContext(FirebaseAuthContext);
  const theme = useTheme();

  return (
    <div>
      <Container>
        {/* <Subtitle>
          This site is a full-stack MERN application, utilizing Node.js,
          Express.js, MongoDB, React.js, React Router, and Material-UI.
          It provides API endpoints for recipe data and user interactions,
          with MongoDB as the database and a modern UI design.
        </Subtitle> */}
        {currentUser ? (
          <>
            <MainTitle>Welcome, <ColoredTitle>{currentUser.email}</ColoredTitle></MainTitle>
            <Subtitle>
              Search, save, and create your own recipes with ease!
            </Subtitle>
            <div>
              <Button component={Link} to="/explore" variant="contained" style={{ fontSize: '16px', marginRight: '15px' }}>Explore</Button>
              <Button component={Link} to="/myrecipes" variant="outlined" style={{ fontSize: '16px' }}>My Recipes</Button>
            </div>
          </>
        ) : (
          <>
            {/* <Title>Welcome to Foodhub! </Title> */}
            <MainTitle variant="h1">Your Personal <ColoredTitle>Recipe Manager</ColoredTitle></MainTitle>
            <Subtitle>
              Discover, create and share your favorite recipes with ease.
            </Subtitle>
            <div>
              <Button component={Link} to="/register" variant="contained" style={{ fontSize: '16px', marginRight: '15px' }}>get started</Button>
              <Button component={Link} to="/explore" variant="outlined" style={{ fontSize: '16px' }}>Explore</Button>
            </div>
          </>
        )}
      </Container >
      <AboutCards />
      <GetStartedBtn>
        <Button component={Link} to="/register" variant="outlined" style={{
          fontSize: '17px',
        }}>Get Started</Button>
      </GetStartedBtn>
    </div >
  );
};

export default HomePage;
