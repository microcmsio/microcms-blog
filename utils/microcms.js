const { createClient } = require('microcms-js-sdk');
// import { createClient } from 'microcms-js-sdk';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

const { API_KEY, SERVICE_ID } = process.env;
export const client = createClient({
  serviceDomain: SERVICE_ID,
  apiKey: API_KEY,
});
