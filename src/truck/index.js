const { getRandom, getRandomBoolean, move } = require('../utils');

module.exports = Truck;

function Truck({ id }, socketAddress) {
  let io;
  const driverId = id;
  const statusTypes = ['stoped', 'delivering'];

  let life;
  let status = statusTypes[getRandom(0, statusTypes.length)];
  let location = {
    lat: 40.4167426,
    lng: -3.703002,
  };

  const isDisconnected  = () => (io && io.disconnected);
  const connect         = () => { if (isDisconnected()) io.connect(); };
  const disconnect      = () => { if (!isDisconnected()) io.disconnect(); };
  const setDisconnect   = () => { clearInterval(life); };
  const changeStatus    = () => { status = statusTypes[getRandom(0, statusTypes.length)]; };
  const bringBackToLife = () => { setInterval(() => { connect(); }, getRandom(30, 120) * 1000); };
  // EVENTS
  const sendStatus = () => {
    if (isDisconnected()) return;
    const event = {
      type   : 'DRIVER_STATUS_RESPONSE',
      payload: { driverId, status },
    };
    io.emit('DRIVER_STATUS_RESPONSE', event);
  };
  const changeLocation = () => {
    const { lat, lng } = location;
    location = { lat: move(lat), lng: move(lng) };
    const event = {
      type   : 'DRIVER_GEOLOCATION',
      payload: { driverId, ...location },
    };
    io.emit('DRIVER_GEOLOCATION', event);
  };
  const eventActions = {
    DRIVER_STATUS_REQUEST: sendStatus,
  };
  const initEvents = () => {
    const keys = Object.keys(eventActions);
    keys.forEach(key => io.on(key, eventActions[key]));
    io.on('PONG', data => console.log('[Client PONG] ', data));
  };

  const startRandomLife = () => {
    life = setInterval(() => {
      if (isDisconnected()) return;
      if (status === 'delivering') changeLocation();
      if (getRandomBoolean()) return changeStatus();
      if (getRandomBoolean() && !isDisconnected()) disconnect();
    }, getRandom(1, 60) * 1000);
  };
  // Socket internal events
  const onConnect = () => {
    initEvents();
    startRandomLife();
    bringBackToLife();
    setTimeout(() => {
      io.emit('PING', { payload: driverId });
    }, 2000);
  };
  const onDisconnect = (reason) => {
    setDisconnect();
    if (reason === 'io server disconnect') io.connect();
  };

  const start = () => {
    io = require('socket.io-client')(socketAddress.address);
    io.connect();
    io.on('connect_error', console.log);
    io.on('connect', onConnect);
    io.on('disconnect', onDisconnect);
  };
  // INIT TRUCK
  setTimeout(start, getRandom(1, 60) * 1000);
}
