import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import styled from 'styled-components';

interface Props {
  searchCallback: (query: string) => void;
}

const Input = styled(TextField)`
  variant: 'outlined';
  text-align: center;
  color: {inputColor}
  width: 15rem;
`;

const RowLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SearchButton = styled(Button)`
  margin-left: 1.5rem;
`;

const SearchInput = ({ searchCallback }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const saveSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (!value || !value.length) return null;
    setSearchQuery(value);
  };

  return (
    <RowLayout>
      <Input
        id="SearchQuery"
        color="primary"
        label="Search"
        onChange={saveSearchQuery}
        value={searchQuery}
        variant="outlined"
      />
      <SearchButton
        color="primary"
        endIcon={<SearchOutlined />}
        onClick={() => {
          searchCallback(searchQuery);
        }}
        variant="contained"
      >
        Search
      </SearchButton>
    </RowLayout>
  );
};

export default SearchInput;
