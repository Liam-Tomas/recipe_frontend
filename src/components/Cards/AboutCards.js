import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';
import spoonacularLogo from '../../images/spoonacular-logo.svg';
import mernLogo from '../../images/MERN-logo.png';
import crudLogo from '../../images/MERN-logo.png';
import mongoLogo from '../../images/mongodb.svg'
import materialUILogo from '../../images/material-ui.svg';
import firebaseLogo from '../../images/Firebase_Logo.svg';
// import exampleLogo from '../assets/example-logo.png';
// import mongodbLogo from '../assets/mongodb-logo.png';
import { useTheme } from '@mui/material/styles';


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
  background-color: ${(props) => props.theme.palette.background.paper};
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
    const theme = useTheme();
    const technicalData = [
        {
            title: 'Leveraging the Spoonacular API',
            description: 'My recipe app utilizes the Spoonacular API, enabling us to access a vast database of recipes and explore detailed ingredient lists, instructions, and nutritional data',
            logo: spoonacularLogo,
        },
        {
            title: 'Built with the MERN Stack',
            description:
                'The app is developed using the MERN (MongoDB, Express.js, React, Node.js) stack, providing a robust and scalable foundation for recipe browsing, searching, and management.',
            logo: mernLogo,
        },
        {
            title: 'Beautiful and Responsive UI with Material-UI',
            description:
                'My app leverages Material-UI, a React component library, to create an intuitive and visually appealing user interface that adapts smoothly across devices.',
            logo: materialUILogo,
        },
        {
            title: 'Secure User Authentication with Firebase',
            description:
                'For user authentication, the app integrates with Firebase authentication to provide a secure and reliable login/signup process, ensuring that user data and interactions are protected.',
            logo: firebaseLogo,
        },
        // Add more technical aspects here
        {
            title: 'Full CRUD Capabilities',
            description: 'Empowered by the MERN stack, my application has comprehensive CRUD (Create, Read, Update, Delete) operations. This gives users  full control over their recipes and data.',
            logo: mernLogo,

        },
        {
            title: 'Data Persistence with MongoDB',
            description:
                'The backend utilizes MongoDB, a NoSQL database, for data persistence. This allows us to efficiently store and retrieve recipe info, user favorites, and other data, ensuring seamless user experience and data consistency.',
            //   logo: mongodbLogo,
            logo: mongoLogo,

        },
    ];

    return (
        <CardGrid>
            {technicalData.map((technical, index) => (
                <StyledCard key={index}>
                    <CardContent>
                        <Typography variant="h5">{technical.title}</Typography>
                        <Typography variant="body1" style={{
                            margin: '20px 0px',
                            fontSize: '1.1rem',
                            color: theme.palette.text.secondary,
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
