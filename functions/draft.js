import dotenv from 'dotenv';
import api from '../instance/axios';

dotenv.config();

// eslint-disable-next-line require-await
export default async (event) => {
  const { id, draftKey } = event.queryStringParameters;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "id" query parameter',
      }),
    };
  }
  return api
    .get(`blog/${id}?draftKey=${draftKey}&depth=2`)
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
