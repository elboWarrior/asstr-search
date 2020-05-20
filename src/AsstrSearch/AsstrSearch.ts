import ErrorManager from '../ErrorManager/ErrorManager';
import makeAsstrParser from './AsstrParser';
import { SearchParameters } from './SearchParameters';

const asstrSearch = (
  search: string,
  begin?: number,
  domain?: string,
  appendQuoteAuthor?: string,
  appendQuoteTitle?: string,
  appendSummary?: string,
  appendChapter?: string,
  appendQuoteUniverse?: string,
  append?: Array<string>,
  number?: number,
  sample?: number,
  span?: string
) => {
  /******************************** PROPERTIES ********************************/

  const parser = makeAsstrParser();
  const searchParameters: SearchParameters = {
    search,
    begin: begin ? begin : 1,
    domain: domain ? domain : 'all',
    appendquote_author: appendQuoteAuthor,
    appendquote_title: appendQuoteTitle,
    append_summary: appendSummary,
    append_chapter: appendChapter,
    appendquote_universe: appendQuoteUniverse,
    append,
    number: number ? number : 25,
    sample,
    span: span ? span : 'broad',
  };

  /******************************** METHODS ********************************/

  const getHtmlBody = async (): Promise<string> => {
    // const searchUrl = 'https://www.asstr.org/search/submitSearch.php';
    const searchUrl = '/asstr-search';
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);
    const response = await fetch(searchUrl, {
      method: 'POST',
      body: JSON.stringify(searchParameters),
      signal: controller.signal,
    });
    if (!response.ok) {
      ErrorManager.throwHtmlError(
        response.status,
        response.statusText,
        'Could not reach ASSTR servers'
      );
    }
    return response.text();
  };

  const increaseSearchIndex = () => {
    searchParameters.begin += searchParameters.number;
  };

  /******************************** RETURN OBJECT ********************************/

  return {
    async run() {
      console.info('running asstr-search query...');
      const htmlBody = await getHtmlBody();
      increaseSearchIndex();
      const results = parser.parseResults(htmlBody);
      console.log('Results: ', results);
      return results;
    },
  };
};

const makeAsstrSearch = (
  search: string,
  begin?: number,
  domain?: string,
  appendQuoteAuthor?: string,
  appendQuoteTitle?: string,
  appendSummary?: string,
  appendChapter?: string,
  appendQuoteUniverse?: string,
  append?: Array<string>,
  number?: number,
  sample?: number,
  span?: string
) => {
  return asstrSearch(
    search,
    begin,
    domain,
    appendQuoteAuthor,
    appendQuoteTitle,
    appendSummary,
    appendChapter,
    appendQuoteUniverse,
    append,
    number,
    sample,
    span
  );
};
export default makeAsstrSearch;
