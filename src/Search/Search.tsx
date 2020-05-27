import React, { useState } from 'react';
import styled from 'styled-components';

import AsstrQuery from '../AsstrSearch/AsstrQuery';
import storyCodesJson from '../data/storyCodes.json';
import StoryCodesCategory from '../types/StoryCodesCategory';
import SizeTable from '../types/SizeTable';
import StorySizes from '../types/StorySizes';
import makeAsstrSearch from '../AsstrSearch/AsstrSearch';
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
  const [results, setResults] = useState<string[] | null>(null);
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);
  const [sizes, setSizes] = React.useState<StorySizes>({
    max: SizeTable[SizeTable.length - 1].value,
    maxDefault: SizeTable[SizeTable.length - 1].value,
    min: SizeTable[0].value,
    minDefault: SizeTable[0].value,
  });

  /**
   * Closes the advanced search, combines the advanced parameters with the input query and runs the search
   * @param query input query to be combined with advanced search parameters
   */
  const searchCallback = async (query: string): Promise<string[] | null> => {
    setAdvancedSearch(false);
    const asstrQuery = AsstrQuery(query, storyCodesCategories, sizes);
    // TODO: remove query info log
    console.info(`query: ${asstrQuery}`);
    const asstrSearch = makeAsstrSearch(asstrQuery);
    return asstrSearch.run();
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
            setResults(await searchCallback(query));
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
        <Results>{results}</Results>
      </ColumnLayout>
    </PageLayout>
  );
};

export default Search;
