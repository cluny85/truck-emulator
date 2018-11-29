const { eventActions } = require('../events');

module.exports = Truck;

function Truck(params, socketAddress) {
  const io = require('socket.io-client')(socketAddress.address);
  const statusTypes = ['stoped', 'delivering'];

  let isActive = false;
  let status = statusTypes[getRandom(0, statusTypes.length)];

  const connect = () => {
    if (io.disconnected) io.connect();
  };
  const disconnect = () => {
    if (!io.disconnected) io.disconnect();
  };
  const sendStatus = () => {

  };
  const initEvents = () => {
    const keys = Object.keys(eventActions);
    keys.forEach(key => io.on(key, eventActions[key]));
    io.on('PONG', data => console.log('[Client PONG] ', data));
  };
  const setConnected = () => {
    isActive = true;
  };
  const setDisconnect = () => {
    isActive = false;
  };
  const start = () => {
    io.connect();
    io.on('connect_error', console.log);
    io.on('connect', () => {
      setConnected();
      initEvents();
      setTimeout(() => {
        console.log('[Client sending PING] ...');
        io.emit('PING', { data: 'Hooooooli' });
      }, 2000);
    });
    io.on('disconnect', (reason) => {
      setDisconnect();
      if (reason === 'io server disconnect') io.connect();
    });
  };
  start();
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
