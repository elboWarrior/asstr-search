/* eslint-disable */
const fetch = require('node-fetch');
const convertToUrlSearchParams = (params) => {
  const searchParams = new URLSearchParams();
  const queryBody = JSON.parse(params);
  for (let key in queryBody) {
    if (queryBody.hasOwnProperty(key)) {
      searchParams.set(key, queryBody[key]);
    }
  }
  return searchParams;
};
exports.handler = async function (event, context) {
  const asstrSearchUrl = 'https://www.asstr.org/search/submitSearch.php';
  const searchParams = convertToUrlSearchParams(event.body);
  console.log('searchParams', searchParams);
  try {
    const response = await fetch(asstrSearchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: searchParams,
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.text();
    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
