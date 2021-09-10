const { client } = require('../utils/microcms');

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
  return client
    .get({
      endpoint: 'blog',
      contentId: id,
      queries: {
        draftKey,
        depth: 2,
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
