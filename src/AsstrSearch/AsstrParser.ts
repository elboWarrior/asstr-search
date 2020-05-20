import cheerio from 'cheerio';
// import * as cheerio from 'cheerio';

const asstrParser = () => {
  /******************************** PROPERTIES ********************************/
  let htmlPage: string | null = null;

  /******************************** METHODS ********************************/

  /******************************** RETURN OBJECT ********************************/

  return {
    parseResults(asstrPage: string): string[] | null {
      htmlPage = asstrPage;
      // console.log(htmlPage);

      const $ = cheerio.load(htmlPage);
      // const tables = $('table').slice(2);
      const tableElements = $('td');
      if (!tableElements) throw new Error('Could not find search matches');
      // const results = tableElements.attr('bgcolor').match(/(#BEC1D2|#BED1E2)/);
      const results = tableElements
        .filter((index: number, element: CheerioElement) => {
          const bgColor = element.attribs['bgcolor'];
          if (bgColor && bgColor.match(/(#BEC1D2|#BED1E2)/)) return true;
          return false;
        })
        .toArray();
      const resultsArray = results.map((result) => $.html(result));
      return resultsArray;
    },
  };
};

const makeAsstrParser = () => {
  return asstrParser();
};

export default makeAsstrParser;
