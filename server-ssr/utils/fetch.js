const fetch = require('node-fetch');
const config = require('../../src/consts/common');

export const nodeFetch = async ({ url }) => {
  try {
    const response = await fetch(`${config.API_URL}${url}`, { method: 'get' });
    const textResponse = await response.text();
    return JSON.parse(textResponse);
  } catch (error) {
    return {
      error: true,
    };
  }
};
