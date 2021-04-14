const api = require('../instance/axios');
require('dotenv').config();

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
  return api
    .get(`blog/?q=${encodeURIComponent(q)}`)
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
