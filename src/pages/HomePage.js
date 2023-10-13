// import { Button } from '@mui/material';
// import React from 'react';
// import styled from 'styled-components';
// import AboutCards from '../components/AboutCards'
// import { Typography } from '@mui/material';
// import HomePic from '../images/home_image1.svg'

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   align-items: center;
//   justify-content: center;
//   gap: 100px;
//   height: 95vh;
//   margin: 0px 110px;
//   background-color: ;
// `;

// const LeftColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   background-color: ;
//   padding-left: 80px;
//   padding-right: 0px;
// `;

// const Title = styled.h1`
//   font-size: 42px;
//   font-weight: 500;
//   margin-bottom: 5px;

// `;

// const Subtitle = styled.p`
//   font-size: 18px;
//   font-weight: 00;
//   margin-bottom: 5px;
// `;

// const RightColumn = styled.div`
//   // display: flex;
//   // align-items: center;
//   // background-color: ;
// `;

// const Image = styled.img`
//   max-width: 75%;
//   margin-top:70px;
//   height: auto;
//   border-radius: 10px;
// `;

// const GetStartedBtn = styled.div`
//   display: flex;
//   justify-content: center;
//   alignItems: center;
//   padding:180px;
//   `

// const HomePage = () => {
//   const recipePhoto = 'https://spoonacular.com/application/frontend/images/food-api/ontology2.svg';

//   return (
//     <div>
//       <Container>
//         <LeftColumn>
//           <Typography variant="h1" style={{
//             fontSize: '4.15rem'
//           }}>The only recipe app you'll ever need.</Typography>
//           <Subtitle style={{
//             fontSize: '1.3rem'
//           }}>
//             Welcome to Recipe Tracker, a platform that provides a seamless recipe
//             search experience, allowing you to find the perfect dishes quickly and effortlessly.
//           </Subtitle>
//           {/* <Subtitle>
//           This site is a full-stack MERN application, utilizing Node.js,
//           Express.js, MongoDB, React.js, React Router, and Material-UI.
//           It provides API endpoints for recipe data and user interactions,
//           with MongoDB as the database and a modern UI design.
//         </Subtitle> */}
//           <Button href="/explore" variant="contained" style={{
//             marginTop: '23px',
//             fontSize: '15px'
//           }}>Get Started</Button>
//         </LeftColumn>
//         <RightColumn>
//           <Image src={HomePic} alt="Recipe Image" />
//         </RightColumn>
//       </Container>
//       <AboutCards />
//       <GetStartedBtn>
//         <Button href="/explore" variant="outlined" style={{
//           fontSize: '17px',
//         }}>Get Started</Button>
//       </GetStartedBtn>
//     </div>

//   );
// };

// export default HomePage;



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
import React from 'react';
import styled from 'styled-components';
import AboutCards from '../components/AboutCards'
import { Typography } from '@mui/material';
import HomePic from '../images/home_image1.svg'
import HomePic2 from '../images/home_image2.svg'

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

const LeftColumn = styled.div`

`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 500;
  margin-bottom: 5px;

`;

const Subtitle = styled.p`
font-size: 24px;
font-weight:;
padding: 0px 0px;

`;

const RightColumn = styled.div`
  // display: flex;
  // align-items: center;
  // background-color: ;
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

  return (
    <div style={{
      // backgroundImage: 'linear-gradient(to top, #f5f7fa 0%, #dfe9f3 60%, white 100%)',
      // backgroundImage: 'linear-gradient(to top, #f3e7e9 60%, #e3eeff 99%, #e3eeff 70%)',
      // backgroundImage: 'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 60%)',
      // backgroundImage: 'linear-gradient(to bottom, #f5f7fa 0%, #625bff 60%, white 100%)',
      // backgroundImage: 'linear-gradient(to bottom, #f5f7fa 0%, #ffb05b 60%, white 100%)',
    
      

    }} >
      <Container>
        <LeftColumn>
          <Typography variant="h1" style={{
            fontSize: '56px',
            fontWeight: '500'
          }}>The only recipe app you'll ever need.</Typography>
          <Subtitle style={{
          }}>
          Discover, create and share your favorite recipes with ease.
          </Subtitle>
          {/* <Subtitle>
          This site is a full-stack MERN application, utilizing Node.js,
          Express.js, MongoDB, React.js, React Router, and Material-UI.
          It provides API endpoints for recipe data and user interactions,
          with MongoDB as the database and a modern UI design.
        </Subtitle> */}
          <Button href="/register" variant="contained" style={{
            fontSize: '15px',
            marginRight: '15px'
          }}>Get Started</Button>
          <Button href="/explore" variant="outlined" style={{
            fontSize: '15px'
          }}>Explore</Button>
        </LeftColumn>
        <RightColumn>
          <Image src={HomePic} alt="Recipe Image" />
          <Image2 src={HomePic2} alt="Recipe Image" />

        </RightColumn>

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
