const axios = require('axios');
require('dotenv').config();
const { API_KEY, SERVICE_ID } = process.env;

// eslint-disable-next-line require-await
exports.handler = async (event) => {
  const { q } = event.queryStringParameters;
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "q" query parameter',
      }),
    };
  }
  return axios
    .get(
      `https://${SERVICE_ID}.microcms.io/api/v1/blog/?q=${encodeURIComponent(
        q
      )}`,
      {
        headers: { 'X-API-KEY': API_KEY },
      }
    )
    .then(({ data }) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    })
    .catch((error) => ({
      statusCode: 400,
      body: String(error),
    }));
};
