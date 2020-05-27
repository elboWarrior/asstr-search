import cheerio from 'cheerio';

const asstrParser = () => {
  /******************************** PROPERTIES ********************************/
  let htmlPage: string | null = null;

  /******************************** METHODS ********************************/

  /******************************** RETURN OBJECT ********************************/

  return {
    parseResults(asstrPage: string): string[] | null {
      htmlPage = asstrPage;

      const $ = cheerio.load(htmlPage);
      const tableElements = $('td');
      if (!tableElements) throw new Error('Could not find search matches');
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
