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


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  height: 85vh;
  padding: 0px 60px;
  // backgroundImage: 'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
  // background-image: linear-gradient(to bottom, #dfe9f3 0%, white 100%);
  ;
`;


const Title = styled.h1`
  font-size: 42px;
  font-weight: 500;
  margin-bottom: 5px;

`;

const Subtitle = styled.p`
font-size: 24px;
font-weight:;
padding-bottom: 5px;

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
  z-index: -10;
`;

const GetStartedBtn = styled.div`
  display: flex;
  justify-content: center;
  alignItems: center;
  padding:180px;
  `

const HomePage = () => {
  const recipePhoto = 'https://spoonacular.com/application/frontend/images/food-api/ontology2.svg';
  const currentUser = useContext(FirebaseAuthContext);

  return (
    <div style={{
      // backgroundImage: 'linear-gradient(to top, #f5f7fa 0%, #dfe9f3 60%, white 100%)',
      // backgroundImage: 'linear-gradient(to top, #f3e7e9 60%, #e3eeff 99%, #e3eeff 70%)',
      // backgroundImage: 'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 60%)',
      // backgroundImage: 'linear-gradient(to bottom, #f5f7fa 0%, #625bff 60%, white 100%)',
      // backgroundImage: 'linear-gradient(to bottom, #f5f7fa 0%, #ffb05b 60%, white 100%)',

    }} >
      <Container>

        <div>
          {/* <Subtitle>
          This site is a full-stack MERN application, utilizing Node.js,
          Express.js, MongoDB, React.js, React Router, and Material-UI.
          It provides API endpoints for recipe data and user interactions,
          with MongoDB as the database and a modern UI design.
        </Subtitle> */}
          {currentUser ? (
            <>
              <Typography variant="h1" style={{
                fontSize: '66px',
                fontWeight: '500',
              }}>Welcome, {currentUser.email}</Typography>
              <Subtitle style={{
              }}>
                Search, save, and create your own recipes with ease!
              </Subtitle>
              <Button href="/explore" variant="contained" style={{ fontSize: '17px', marginRight: '15px' }}>Explore</Button>
              <Button href="/favorites" variant="contained" style={{ fontSize: '17px', marginRight: '15px' }}>Favorites</Button>
              <Button href="/myrecipes" variant="contained" style={{ fontSize: '17px' }}>My Recipes</Button>
            </>
          ) : (
            <>
              <Typography variant="h1" style={{
                fontSize: '56px',
                fontWeight: '500'
              }}>The only recipe app you'll ever need.</Typography>
              <Subtitle style={{
              }}>
                Discover, create and share your favorite recipes with ease.
              </Subtitle>
              <Button href="/register" variant="contained" style={{ fontSize: '15px', marginRight: '15px' }}>get started</Button>
              <Button href="/explore" variant="outlined" style={{ fontSize: '15px' }}>Explore</Button>
            </>
          )}
        </div>
      </Container>
      <AboutCards />
      <GetStartedBtn>
        <Button href="/explore" variant="outlined" style={{
          fontSize: '17px',
        }}>Get Started</Button>
      </GetStartedBtn>

    </div>

  );
};

export default HomePage;
