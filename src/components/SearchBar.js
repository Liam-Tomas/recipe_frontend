import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from 'react';
import { styled } from '@mui/system';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';


const SearchContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSearchContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.palette.text.tertiary};
  border-radius: 5px;
  background-color: ${(props) => props.theme.palette.background.paper};
  background-color: transparent;
  width: 400px;
  margin-top: 10px;

  &:hover {
    border: 1px solid ${(props) => props.theme.palette.text.primary};
  }

  &:focus-within {
    border: 1px solid ${(props) => props.theme.palette.primary.main};
  }
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
  padding: 7px 0px;
  background-color: transparent;
`;

const SearchIcon = styled(AiOutlineSearch)`
  margin: 8px;
  pointer-events: none;
`;

const SearchBar = ({ onSearch, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (event) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
    if (onChange) onChange(newTerm);  // Propagate change up to ComplexSearch
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