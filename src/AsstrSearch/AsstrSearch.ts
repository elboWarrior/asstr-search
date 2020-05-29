import ErrorManager from '../ErrorManager/ErrorManager';
import InitialSearchParameters from './InitialSearchParameters';
import makeAsstrParser from './AsstrParser';
import SearchDirection from './SearchDirection';
import SearchParameters from './SearchParameters';

class AsstrSearch {
  private parser = makeAsstrParser();
  private initialSearchParameters: InitialSearchParameters = {
    search: this.search,
    begin: this.begin,
    domain: this.domain,
    appendquote_author: this.appendQuoteAuthor,
    appendquote_title: this.appendQuoteTitle,
    append_summary: this.appendSummary,
    append_chapter: this.appendChapter,
    appendquote_universe: this.appendQuoteUniverse,
    append: this.append,
    number: this.number,
    sample: this.sample,
    span: this.span,
  };
  private searchParameters: Promise<SearchParameters>;

  constructor(
    private search: string,
    private begin: number = 1,
    private domain: string = 'all',
    private number: number = 25,
    private sample: number = 1,
    private span: string = 'broad',
    private append?: Array<string>,
    private appendQuoteAuthor?: string,
    private appendQuoteTitle?: string,
    private appendSummary?: string,
    private appendChapter?: string,
    private appendQuoteUniverse?: string
  ) {
    this.searchParameters = this.getSearchParameters();
  }

  async getSearchParameters(): Promise<SearchParameters> {
    const resultUrl = await this.fetchAsstr(
      '/asstr-search-init',
      this.initialSearchParameters
    );
    const idString = resultUrl.match(/id=[0-9]+/);
    if (!idString) {
      throw new Error('Could not get result ID from ASSTR servers.');
    }
    console.log('id string', idString);
    const searchId = idString[0].match(/[0-9]+/);
    if (!searchId) {
      throw new Error('Could not get result ID from ASSTR servers.');
    }
    console.log('search id', searchId[0]);

    return {
      id: searchId[0],
      begin: this.initialSearchParameters.begin,
      number: this.initialSearchParameters.number,
      sample: this.initialSearchParameters.sample,
    } as SearchParameters;
  }
  /******************************** PROPERTIES ********************************/

  async run(direction: SearchDirection = SearchDirection.NONE) {
    console.info('running asstr-search query...');
    await this.setSearchIndex(direction);
    const htmlBody = await this.runSearch();
    const results = this.parser.parseResults(htmlBody);
    return results;
  }

  /******************************** METHODS ********************************/

  private async fetchAsstr(
    netlifyUrl: string,
    parameters: InitialSearchParameters | SearchParameters
  ): Promise<string> {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);
    const response = await fetch(netlifyUrl, {
      method: 'POST',
      body: JSON.stringify(parameters),
      signal: controller.signal,
    });
    if (!response.ok) {
      ErrorManager.throwHtmlError(
        response.status,
        response.statusText,
        'Could not reach ASSTR servers'
      );
    }
    const data = await response.text();
    console.log('response', data);
    return data;
  }

  private async runSearch(): Promise<string> {
    console.log('search Params', await this.searchParameters);
    return this.fetchAsstr('/asstr-search', await this.searchParameters);
  }

  private async setSearchIndex(direction: SearchDirection) {
    const searchParameters = await this.searchParameters;
    switch (direction) {
      case SearchDirection.FORWARD:
        searchParameters.begin += searchParameters.number;
        break;
      case SearchDirection.BACKWARD:
        if (searchParameters.begin > searchParameters.number) {
          searchParameters.begin -= searchParameters.number;
        }
        break;
      default:
        searchParameters.begin = 1;
        break;
    }
    console.log(searchParameters.begin);
  }
}

export default AsstrSearch;
