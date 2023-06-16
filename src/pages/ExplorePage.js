import React, { useState } from 'react';
import  ComplexSearch from '../components/ComplexSearch'
import styled from 'styled-components';
import { Typography } from '@mui/material';

const StyledHeaders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0px;
`;


function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

    return (
        <section style={{
            //   background: 'linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)',
            // background: 'linear-gradient(to bottom, #f0f2f0, #000c40)',
            background:'',
            paddingTop: '125px',
            paddingBottom: '75px',
            marginBottom: '0px',
            margin: '0px 25px'
        }}>
            <StyledHeaders>
                <Typography variant="h4" style={{
                    // fontSize: '2.1rem',
                    // fontWeight: '500',
                }}>Explore a World of Recipes
                </Typography>
                <Typography variant="h6" style={{
                    // fontSize: '1.2rem',
                    // fontWeight: '400',
                    padding: '30px'
                }}>Discover new flavors and unleash your inner chef by searching through our extensive collection of recipes.
                </Typography>
            </StyledHeaders>
            <ComplexSearch/>
            {/* <FilterSearch/> */}
        </section>
    );
}


export default ExplorePage;


// Unleash your Inner Chef, Share Your Culinary Journey, and Connect with Food Fanatics
