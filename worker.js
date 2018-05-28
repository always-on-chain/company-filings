const request = require('request');

const getFilingData = (company, callback) => {
  let options = {
    url: `https://www.sec.gov/cgi-bin/browse-edgar?CIK=${company}&owner=exclude&action=getcompany`
  };

  request(options, (err, response, body) => {
    console.log('error:', err);
    console.log('statusCode:', response.statusCode);
    // console.log('body:', body);
    callback(body);
  })
}

const getFilingPage = (url, callback) => {
  let options = {
    url: url
  };

  request(options, (err, response, body) => {
    console.log('error:', err);
    console.log('statusCode:', response.statusCode);
    // console.log('body:', body);
    callback(body);
  })
}

module.exports.getFilingData = getFilingData;
module.exports.getFilingPage = getFilingPage;