const request = require('sync-request');

const getAPI = url => {
  // Get data from API with sync request
  const res = request('GET', url);
  return JSON.parse(res.getBody('utf8'));
};

module.exports = getAPI;
