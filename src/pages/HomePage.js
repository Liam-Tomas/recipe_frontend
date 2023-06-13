import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import AboutCards from '../components/AboutCards'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 0px;
  height: 90vh;
  margin: 0px 150px;
  background-color: ;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ;
  padding-left: 90px;
  padding-right: 80px;
`;

const Title = styled.h1`
  font-size: 46px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  margin-bottom: 0px;
  color: grey;
  font-weight: 400;
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  background-color: ;
  padding: 0px;
  margin: 0px;
`;

const Image = styled.img`
  max-width: 85%;
  margin-top: 70px;
  height: auto;
  border-radius: 10px;
`;

const GetStartedBtn = styled.div`
  display: flex;
  justify-content: center;
  alignItems: center;
  padding:180px;
  `

const HomePage = () => {
  const recipePhoto = 'https://spoonacular.com/application/frontend/images/food-api/ontology2.svg';

  return (
    <div>
      <Container>
        <LeftColumn>
          <Title>The only recipe app <br /> you'll ever need.</Title>
          <Subtitle>
            Welcome to Recipe Tracker, a platform that provides a seamless recipe
            search experience, allowing you to find the perfect dishes quickly and effortlessly.
          </Subtitle>
          {/* <Subtitle>
          This site is a full-stack MERN application, utilizing Node.js,
          Express.js, MongoDB, React.js, React Router, and Material-UI.
          It provides API endpoints for recipe data and user interactions,
          with MongoDB as the database and a modern UI design.
        </Subtitle> */}
          <Button href="/explore" variant="contained" style={{
            marginTop: '33px',
            fontSize: '15px'
          }}>Get Started</Button>
        </LeftColumn>
        <RightColumn>
          <Image src={recipePhoto} alt="Recipe Image" />
        </RightColumn>
      </Container>
      <AboutCards />
      <GetStartedBtn>
        <Button href="/explore" variant="contained" style={{
          fontSize: '17px',
        }}>Get Started</Button>
      </GetStartedBtn>
    </div>

  );
};

export default HomePage;



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