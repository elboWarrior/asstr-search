import React, { useState } from 'react';
import styled from 'styled-components';

import AsstrQuery from '../AsstrSearch/AsstrQuery';
import AsstrSearch from '../AsstrSearch/AsstrSearch';
import SearchDirection from '../AsstrSearch/SearchDirection';
import storyCodesJson from '../data/storyCodes.json';
import StoryCodesCategory from '../types/StoryCodesCategory';
import SizeTable from '../types/SizeTable';
import StorySizes from '../types/StorySizes';
import AdvancedSearch from './AdvancedSearch/AdvancedSearch';
import PageLayout from './Layout/PageLayout';
import Results from './Results/Results';
import SearchInput from './SearchInput/SearchInput';
import Title from './Title/Title';

const ColumnLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const AdvancedSearchWrapper = styled.div`
  height: 250px;
  width: 100%;
`;

const Search = () => {
  const storyCodesCategories = (storyCodesJson as any) as StoryCodesCategory[];
  const [asstrSearch, setAsstrSearch] = useState<AsstrSearch | null>(null);
  const [results, setResults] = useState<string[] | null>(null);
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);
  const [sizes, setSizes] = React.useState<StorySizes>({
    max: SizeTable[SizeTable.length - 1].value,
    maxDefault: SizeTable[SizeTable.length - 1].value,
    min: SizeTable[0].value,
    minDefault: SizeTable[0].value,
  });

  const resultsCallback = async (
    direction: SearchDirection
    // ): Promise<string[] | null> => {
  ): Promise<void> => {
    if (!asstrSearch) throw new Error('No query set by the user');
    try {
      const results = await asstrSearch.run(direction);
      console.log(results);
      setResults(results);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Closes the advanced search, combines the advanced parameters with the input query and runs the search
   * @param query input query to be combined with advanced search parameters
   */
  // const searchCallback = async (query: string): Promise<string[] | null> => {
  const searchCallback = async (query: string) => {
    setAdvancedSearch(false);
    const asstrQuery = new AsstrQuery(query, storyCodesCategories, sizes);
    // TODO: remove query info log
    console.info(`query: ${asstrQuery.query}`);
    const search = new AsstrSearch(asstrQuery.query);
    setAsstrSearch(search);
    try {
      setResults(await search.run());
    } catch (error) {
      console.log(error);
    }
  };

  const sizesCallback = (newSizes: number[]) => {
    sizes.min = newSizes[0];
    sizes.max = newSizes[1];
    setSizes(sizes);
  };

  return (
    <PageLayout>
      <ColumnLayout>
        <Title />
        <SearchInput
          advancedSearchState={advancedSearch}
          advancedSearchCallback={() => {
            setAdvancedSearch(!advancedSearch);
          }}
          searchCallback={async (query) => {
            searchCallback(query);
          }}
        />
        <AdvancedSearchWrapper>
          {advancedSearch && (
            <AdvancedSearch
              sizes={sizes}
              sizesCallback={sizesCallback}
              storyCodesCategories={storyCodesCategories}
            />
          )}
        </AdvancedSearchWrapper>
        <Results resultsCallback={resultsCallback}>{results}</Results>
      </ColumnLayout>
    </PageLayout>
  );
};

export default Search;
