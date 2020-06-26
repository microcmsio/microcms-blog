import fetch from 'node-fetch';

exports.handler = (event) => {
  const { q } = event.queryStringParameters;
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "q" query parameter',
      }),
    };
  }
  return fetch(`https://microcms.microcms.io/api/v1/blog/?q=${q}`, {
    headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' },
  }).then((response) => response.json());
};
