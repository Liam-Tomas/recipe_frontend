import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from 'react';
import { styled } from '@mui/system';
import InputBase from '@mui/material/InputBase';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSearchContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  border-radius: 10px;
  background-color: white;
  width: 450px;
  margin-top: 10px;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
  padding: 8px 0px;
  background-color: transparent;
  color: black;
`;

const SearchIcon = styled(AiOutlineSearch)`
  margin: 8px;
  pointer-events: none;
  color: black;
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <StyledSearchContainer>
          <SearchIcon size='20' />
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={handleChange}
          />
        </StyledSearchContainer>
      </form>
      
    </SearchContainer>
  );
};

export default SearchBar;