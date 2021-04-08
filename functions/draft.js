const axios = require('axios');
require('dotenv').config();
const { API_KEY, SERVICE_ID } = process.env;

// eslint-disable-next-line require-await
exports.handler = async (event) => {
  const { id, draftKey } = event.queryStringParameters;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "id" query parameter',
      }),
    };
  }
  return axios
    .get(
      `https://${SERVICE_ID}.microcms.io/api/v1/blog/${id}?draftKey=${draftKey}&depth=2`,
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
