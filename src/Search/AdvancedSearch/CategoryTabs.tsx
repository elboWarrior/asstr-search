import React, { ChangeEvent, ReactNode } from 'react';
import { Tab, Tabs } from '@material-ui/core';

import StoryCodesCategory from '../../types/StoryCodesCategory';

interface CategoryProps {
  storyCodesCategories: StoryCodesCategory[];
  handleChange: (event: ChangeEvent<{}>, newValue: number) => void;
  value: number;
}

interface CategoryTabsProps {
  children?: ReactNode;
  handleChange: (event: ChangeEvent<{}>, newValue: number) => void;
  value: number;
}

const a11yProps = (index: number) => {
  return {
    key: `storycode-tab-${index}`,
    id: `storycode-tab-${index}`,
    'aria-controls': `storycode-tabpanel-${index}`,
  };
};

const categoryTabs = (categories: StoryCodesCategory[]): Array<{}> => {
  const tabs: {}[] = [];
  categories.forEach((category, index) => {
    const tab = <Tab label={category.category} {...a11yProps(index)} />;
    tabs.push(tab);
  });
  return tabs;
};

const CategoryTabs = ({
  handleChange,
  storyCodesCategories,
  value,
}: CategoryProps) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="storycode tabs"
    >
      {categoryTabs(storyCodesCategories)}
    </Tabs>
  );
};

export default CategoryTabs;
