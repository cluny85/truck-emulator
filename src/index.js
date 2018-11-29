const server = require('./server');
const Truck = require('./truck');

module.exports = init;

function init({ socketAddress }) {
  console.log('Init Truck Emulator...');
  if (server) server(socketAddress);
  Truck(undefined, socketAddress);
}
