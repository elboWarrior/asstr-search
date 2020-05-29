/* eslint-disable */
const fetch = require('node-fetch');

const convertToUrlSearchParams = (searchParams) => {
  const searchParamsEncoded = new URLSearchParams();
  for (let key in searchParams) {
    if (searchParams.hasOwnProperty(key)) {
      searchParamsEncoded.set(key, searchParams[key]);
    }
  }
  return searchParamsEncoded;
};

exports.handler = async function (event, context) {
  const asstrSearchUrl = 'https://www.asstr.org/search/submitSearch.php';
  const searchParameters = JSON.parse(event.body);
  const searchParamsEncoded = convertToUrlSearchParams(searchParameters);

  console.log('asstr-search-init searchParams', searchParamsEncoded);
  try {
    const response = await fetch(asstrSearchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: searchParamsEncoded,
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    return {
      statusCode: 200,
      body: response.url,
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
