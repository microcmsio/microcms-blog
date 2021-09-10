const { createClient } = require('microcms-js-sdk');
require('dotenv').config();
const { API_KEY, SERVICE_ID } = process.env;
const client = createClient({
  serviceDomain: SERVICE_ID,
  apiKey: API_KEY,
});

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
  return client
    .get({
      endpoint: 'blog',
      queries: {
        q: encodeURIComponent(q),
      },
    })
    .then((data) => {
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
