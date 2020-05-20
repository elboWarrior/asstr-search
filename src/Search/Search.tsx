import React, { useState } from 'react';

import makeAsstrSearch from '../AsstrSearch/AsstrSearch';
import PageLayout from './Layout/PageLayout';
import Results from './Results/Results';
import SearchInput from './SearchInput/SearchInput';
import Title from './Title/Title';

const searchCallback = async (query: string): Promise<string[] | null> => {
  // TODO: remove query info log
  console.info(`query: ${query}`);
  const asstrSearch = makeAsstrSearch(query);
  return asstrSearch.run();
};

const Search = () => {
  const [results, setResults] = useState<string[] | null>(null);
  return (
    <PageLayout>
      <header>
        <Title />
      </header>
      <SearchInput
        searchCallback={async (query) => {
          const results = await searchCallback(query);
          console.log('callback', results);
          setResults(results);
        }}
      />
      <Results>{results}</Results>
    </PageLayout>
  );
};

export default Search;
