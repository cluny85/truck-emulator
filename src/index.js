// const server = require('./server');
const Truck = require('./truck');

module.exports = init;

function init({ socketAddress, trucks = 1 }) {
  console.log('Init Truck Emulator...');
  // server(socketAddress);
  for (let i = 0; i < trucks; i++) {
    Truck({ id: i + 1 }, socketAddress);
  }
}
