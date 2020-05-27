import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import StoryCodesCategory from '../../types/StoryCodesCategory';
import StorySizes from '../../types/StorySizes';
import CategoryTabs from './CategoryTabs';
import CategoryPanels from './CategoryPanels';
import SizeSlider from './SizeSlider';

interface AdvancedSearchProps {
  storyCodesCategories: StoryCodesCategory[];
  sizesCallback: (newSizes: number[]) => void;
  sizes: StorySizes;
}

const CategoriesWrapper = styled.div`
  padding: 0 15%;
  max-width: 100%;
`;

const AdvancedSearch = ({
  sizesCallback,
  storyCodesCategories,
  sizes,
}: AdvancedSearchProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <CategoriesWrapper>
      <CategoryTabs
        handleChange={handleChange}
        storyCodesCategories={storyCodesCategories}
        value={value}
      />
      <CategoryPanels storyCodes={storyCodesCategories} value={value} />
      <SizeSlider sizes={sizes} sizesCallback={sizesCallback} />
    </CategoriesWrapper>
  );
};

export default AdvancedSearch;
