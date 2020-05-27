import StoryCodes from '../types/StoryCodes';
import StoryCodesCategory from '../types/StoryCodesCategory';
import StorySizes from '../types/StorySizes';
import TriState from '../types/TriState';

const AsstrQuery = (
  query: string,
  storyCodesCategories: StoryCodesCategory[],
  sizes: StorySizes
): string => {
  const getExcludedQuery = (): string => {
    const excludedStoryCodes = getStoryCodes(TriState.EXCLUDES);
    return getStoryCodesQuery(excludedStoryCodes, TriState.EXCLUDES);
  };

  const getIncludedQuery = (): string => {
    const includedStoryCodes = getStoryCodes(TriState.INCLUDES);
    return getStoryCodesQuery(includedStoryCodes, TriState.INCLUDES);
  };

  const getSizeQuery = (): string => {
    let sizeQuery = '';
    if (sizes.min > sizes.minDefault) sizeQuery += ` minsize:${sizes.min}`;
    if (sizes.max < sizes.maxDefault) sizeQuery += ` maxsize:${sizes.max}`;
    return sizeQuery;
  };

  const getStoryCodes = (state: TriState): StoryCodes[] => {
    const storyCodes = storyCodesCategories.map((category) =>
      category.storyCodes.filter((storyCode) => storyCode.state === state)
    );
    return storyCodes.flat();
  };

  const getStoryCodesQuery = (
    storyCodes: StoryCodes[],
    state: TriState
  ): string => {
    let storyCodesQuery = '';
    storyCodes.forEach((storyCode) => {
      storyCodesQuery +=
        state === TriState.EXCLUDES ? ' -keyword:(' : ' keyword:(';
      storyCode.codes.forEach((code) => (storyCodesQuery += code));
      storyCodesQuery += ')';
    });
    return storyCodesQuery;
  };

  return query + getIncludedQuery() + getExcludedQuery() + getSizeQuery();
};

export default AsstrQuery;
