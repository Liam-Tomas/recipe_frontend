import React, { useState } from 'react';
import  ComplexSearch from '../components/ComplexSearch'
import styled from 'styled-components';

const StyledHeaders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
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
                <h1 style={{
                    fontSize: '2.1rem',
                    color: 'black',
                    fontWeight: '500',
                    margin: '0',
                    padding: '0'
                }}>Explore a World of Recipes</h1>
                <h2 style={{
                    color: 'black',
                    fontSize: '1.2rem',
                    margin: '0px',
                    fontWeight: '400',
                    padding: '30px'
                }}>Discover new flavors and unleash your inner chef by searching through our extensive collection of recipes.</h2>
            </StyledHeaders>
            <ComplexSearch/>
            {/* <FilterSearch/> */}
        </section>
    );
}


export default ExplorePage;


// Unleash your Inner Chef, Share Your Culinary Journey, and Connect with Food Fanatics
