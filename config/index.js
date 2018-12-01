const path = require('path');

module.exports = {
  root         : path.normalize(__dirname + '/..'),
  socketAddress: {
    address: 'http://localhost:40718',
    url    : 'http://localhost',
    port   : 40718,
  },
  trucks: 9,
};
