import React, { useState } from 'react';
import { Button, IconButton, TextField } from '@material-ui/core';
import { Add, Remove, SearchOutlined } from '@material-ui/icons';
import styled from 'styled-components';

interface Props {
  advancedSearchState: boolean;
  advancedSearchCallback: () => void;
  searchCallback: (query: string) => void;
}

// TODO: change icon on click
const AdvancedSearchButton = styled(({ active, ...props }) => (
  <IconButton
    aria-label="Advanced Search"
    children={active ? <Remove /> : <Add />}
    color="primary"
    edge="start"
    size="small"
    variant="outlined"
    {...props}
  />
))``;

const Input = styled(TextField)`
  variant: 'outlined';
  text-align: center;
  color: {inputColor}
`;

const RowLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SearchButton = styled((props) => (
  <Button
    color="primary"
    endIcon={<SearchOutlined />}
    label="Search"
    variant="contained"
    {...props}
  />
))`
  margin-left: 1.5rem;
`;

const SearchInput = ({
  advancedSearchState,
  advancedSearchCallback,
  searchCallback,
}: Props) => {
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
      <AdvancedSearchButton
        active={advancedSearchState}
        onClick={() => {
          advancedSearchCallback();
        }}
      ></AdvancedSearchButton>
      <SearchButton
        onClick={() => {
          searchCallback(searchQuery);
        }}
      >
        Search
      </SearchButton>
    </RowLayout>
  );
};

export default SearchInput;
