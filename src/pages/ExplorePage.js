import React, { useState } from 'react';
import ComplexSearch from '../components/RecipeExplore/ComplexSearch'
import styled from 'styled-components';
import { Typography } from '@mui/material';

const StyledHeaders = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
    text-align: center;
    @media (max-width: 1000px) {
        text-align: left;
        padding: 0rem 0rem;
        align-items:flex-start; to keep the contents aligned to the left
    }
`;

const MainContainer = styled.div`
    padding-top: 115px;
    padding-bottom: 75px;
    margin: 0px 55px;
    @media (max-width: 1000px) {
        margin: 15px; // Adjust left and right margins as needed
        padding-top: 90px;
        padding-left: 10px;
        padding-right:10px;
        display: flex;
        flex-direction: column;
        align-items:center; to keep the contents aligned to the left
    }
`

const Title = styled.h1`
    font-weight: 600;
    font-family: Inter;
    @media (max-width: 800px) {
        font-size: 1.5rem;  
    }
`

const SubTitle = styled.h2`
    font-size: 1.3rem;
    font-weight: 400;
    font-family: Inter;
    padding: 25px;
    color: ${(props) => props.theme.palette.text.secondary};

    @media (max-width: 1000px) {
        font-size: 1.05rem;
        padding:20px 0px;

    }

`

function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <MainContainer >
            <StyledHeaders>
                <Title>Explore a World of Recipes </Title>
                <SubTitle>Discover new flavors and unleash your inner chef by searching through our extensive collection of recipes.</SubTitle>
            </StyledHeaders>
            <ComplexSearch />
            {/* <FilterSearch/> */}
        </MainContainer>
    );
}


export default ExplorePage;


// Unleash your Inner Chef, Share Your Culinary Journey, and Connect with Food Fanatics
