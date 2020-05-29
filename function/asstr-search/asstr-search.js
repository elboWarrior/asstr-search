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
  const asstrResultUrl = new URL('https://www.asstr.org/search/results.php');
  const searchParams = JSON.parse(event.body);
  const searchParamsEncoded = convertToUrlSearchParams(searchParams);
  asstrResultUrl.search = searchParamsEncoded;

  console.log('asstr-search searchParams', searchParamsEncoded);
  try {
    const response = await fetch(asstrResultUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    return {
      statusCode: 200,
      body: await response.text(),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
