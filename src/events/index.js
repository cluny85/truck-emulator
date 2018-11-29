const eventActions = {
  DRIVER_GEOLOCATION    : sendGeo,
  DRIVER_STATUS_REQUEST : sendStatus,
  // DRIVER_STATUS_RESPONSE: 'DRIVER_STATUS_RESPONSE',
};

module.exports = {
  eventActions,
};

function sendGeo(data) {
  const type = 'DRIVER_GEOLOCATION';
  const payload = {

  };
  return {
    type,
    payload,
  };
}

function sendStatus(data) {
  const type = 'DRIVER_STATUS_RESPONSE';
  const payload = {

  };
  return {
    type,
    payload,
  };
}
