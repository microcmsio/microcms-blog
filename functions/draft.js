const axios = require('axios');

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
      `https://microcms.microcms.io/api/v1/blog/${id}?draftKey=${draftKey}&depth=2`,
      {
        headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' },
      }
    )
    .then(({ data }) => {
      return {
        headers: {
          'Access-Control-Allow-Origin': 'https://microcms.io',
        },
        statusCode: 200,
        body: JSON.stringify(data),
      };
    })
    .catch((error) => ({
      headers: {
        'Access-Control-Allow-Origin': 'https://microcms.io',
      },
      statusCode: 400,
      body: String(error),
    }));
};
