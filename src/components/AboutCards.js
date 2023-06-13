import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';

import spoonacularLogo from '../images/spoonacular-logo.svg';
import mernLogo from '../images/MERN-logo.png';
import materialUILogo from '../images/material-ui.svg';
import firebaseLogo from '../images/Firebase_Logo.svg';
// import exampleLogo from '../assets/example-logo.png';
// import mongodbLogo from '../assets/mongodb-logo.png';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 20px 130px;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 20px;
  box-shadow: rgba(33, 35, 39, 0.08) 0px 8px 24px;
  background-color:#fff;
`;

const LogoImage = styled.img`
  height: 120px;  // Or a height that suits your layout
  max-width:100%;
  object-fit: contain;
  margin-bottom:20px;
`;

const LogoContainer = styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:20px;
`

const TechnicalCards = () => {
    const technicalData = [
        {
            title: 'Leveraging the Spoonacular API',
            description:
                'Our recipe app utilizes the Spoonacular API, enabling us to access a vast database of recipes and nutritional information. This allows users to discover a wide variety of recipes from around the world and explore detailed ingredient lists, instructions, and nutritional data.',
              logo: spoonacularLogo,
        },
        {
            title: 'Built with the MERN Stack',
            description:
                'Our app is developed using the MERN (MongoDB, Express.js, React, Node.js) stack, providing a robust and scalable foundation for seamless recipe browsing, searching, and management.',
            logo: mernLogo,
        },
        {
            title: 'Beautiful and Responsive UI with Material-UI',
            description:
                'We leverage Material-UI, a popular React component library, to create an intuitive and visually appealing user interface that adapts smoothly to different devices and screen sizes.',
            logo: materialUILogo,
        },
        {
            title: 'Secure User Authentication with Firebase',
            description:
                'Our app integrates Firebase authentication to provide a secure and reliable login/signup process, ensuring that user data and interactions are protected.',
              logo: firebaseLogo,
        },
        // Add more technical aspects here
        {
            title: 'Example Technical Aspect',
            description:
                'This is an example of another technical aspect of our app. Add more cards like this to showcase additional features and technologies.',
            //   logo: exampleLogo,
        },
        {
            title: 'Data Persistence with MongoDB',
            description:
                'Our app utilizes MongoDB, a NoSQL database, for data persistence. This allows us to efficiently store and retrieve recipe information, user profiles, and other data, ensuring seamless user experience and data consistency.',
            //   logo: mongodbLogo,
        },
    ];

    return (
        <CardGrid>
            {technicalData.map((technical, index) => (
                <StyledCard key={index}>
                    <CardContent>
                        <Typography variant="h6">{technical.title}</Typography>
                        <Typography variant="body1" style={{
                            margin: '20px 0px',
                        }}>{technical.description}</Typography>
                        <LogoContainer>
                            <LogoImage src={technical.logo} alt={`${technical.title} Logo`} />
                        </LogoContainer>
                    </CardContent>
                </StyledCard>
            ))}
        </CardGrid>
    );
};

export default TechnicalCards;
