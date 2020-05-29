import StoryCodes from '../types/StoryCodes';
import StoryCodesCategory from '../types/StoryCodesCategory';
import StorySizes from '../types/StorySizes';
import TriState from '../types/TriState';

class AsstrQuery {
  constructor(
    private _query: string,
    private _storyCodesCategories: StoryCodesCategory[],
    private _sizes: StorySizes
  ) {}

  get query(): string {
    return (
      this._query + this.includedQuery + this.excludedQuery + this.sizeQuery
    );
  }

  private get excludedQuery(): string {
    const excludedStoryCodes = this.getStoryCodes(TriState.EXCLUDES);
    return this.getStoryCodesQuery(excludedStoryCodes, TriState.EXCLUDES);
  }

  private get includedQuery(): string {
    const includedStoryCodes = this.getStoryCodes(TriState.INCLUDES);
    return this.getStoryCodesQuery(includedStoryCodes, TriState.INCLUDES);
  }

  private get sizeQuery(): string {
    let sizeQuery = '';
    if (this._sizes.min > this._sizes.minDefault)
      sizeQuery += ` minsize:${this._sizes.min}`;
    if (this._sizes.max < this._sizes.maxDefault)
      sizeQuery += ` maxsize:${this._sizes.max}`;
    return sizeQuery;
  }

  private getStoryCodes = (state: TriState): StoryCodes[] => {
    const storyCodes = this._storyCodesCategories.map((category) =>
      category.storyCodes.filter((storyCode) => storyCode.state === state)
    );
    return storyCodes.flat();
  };

  private getStoryCodesQuery = (
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
}

export default AsstrQuery;
