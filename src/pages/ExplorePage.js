import React, { useState } from 'react';
import ComplexSearch from '../components/RecipeExplore/ComplexSearch'
import styled from 'styled-components';
import { Typography } from '@mui/material';

const StyledHeaders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0px;
`;

const MainContainer = styled.div`
// background: 'linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)',
// background: 'linear-gradient(to bottom, #f0f2f0, #000c40)',
padding-top: 115px;
padding-bottom: 75px;
margin-bottom: 0px;
margin: 0px 55px;
`


function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <MainContainer >
            <StyledHeaders>
                <Typography variant="h4" style={{
                    fontSize: '2.3rem',
                    fontWeight: '500',
                }}>Explore a World of Recipes
                </Typography>
                <Typography variant="h6" style={{
                    fontSize: '1.3rem',
                    fontWeight: '400',
                    padding: '30px'
                }}>Discover new flavors and unleash your inner chef by searching through our extensive collection of recipes.
                </Typography>
            </StyledHeaders>
            <ComplexSearch />
            {/* <FilterSearch/> */}
        </MainContainer>
    );
}


export default ExplorePage;


// Unleash your Inner Chef, Share Your Culinary Journey, and Connect with Food Fanatics
