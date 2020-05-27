import React from 'react';
import styled from 'styled-components';

import StoryCode from '../../types/StoryCodes';
import StoryCodesCategory from '../../types/StoryCodesCategory';
import StoryCodesSelect from './StoryCodesSelect';

interface CategoryPanelsProps {
  storyCodes: StoryCodesCategory[];
  value: number;
}

interface TabPanelProps {
  index: number;
  label: string;
  value: number;
  storyCodes: StoryCode[];
}

const StoryCodesTab = ({
  label,
  index,
  value,
  storyCodes,
  ...props
}: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      key={`storycode-tabpanel-${index}`}
      id={`storycode-tabpanel-${index}`}
      aria-labelledby={`storycode-tab-${index}`}
      {...props}
    >
      {value === index && <StoryCodesSelect storyCodes={storyCodes} />}
    </div>
  );
};

const getTabPanels = (storyCodes: StoryCodesCategory[], value: number) => {
  const tabs: {}[] = [];
  storyCodes.forEach((category, index) => {
    const tab = (
      <StoryCodesTab
        index={index}
        key={`${category.category}-${index}`}
        label={category.category}
        value={value}
        storyCodes={category.storyCodes}
      />
    );
    tabs.push(tab);
  });
  return tabs;
};

const TabPanelWrapper = styled.div`
  width: 100%;
`;

const CategoryPanels = ({ storyCodes, value }: CategoryPanelsProps) => {
  return <TabPanelWrapper>{getTabPanels(storyCodes, value)}</TabPanelWrapper>;
};

export default CategoryPanels;
