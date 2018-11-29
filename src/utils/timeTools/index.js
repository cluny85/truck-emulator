const mtz    = require('moment-timezone');

const convertMinutesToMilliseconds = time => time * 60 * 1000;
const getTimeZoneWithOffset = (time, zone) => mtz.tz(time, zone).format();
const isNowBeforeThan = end => mtz().isBefore(mtz(end));
const getFormatedDate = date => mtz(date).format('YYYY-MM-DD HH:mm');
const getNowInOffset = timezone => mtz().tz(timezone);
const getNowInOffsetWithFormat = (timezone, format = 'YYYY-MM-DD HH:mm') => mtz().tz(timezone).format(format);

const getOffset = (timezone) => {
  const offset = mtz.tz(timezone).format('Z').toString();
  const isNegative = offset.substring(0, 1) === '-';
  const hours = parseInt(offset.substring(1, offset.indexOf(':')), 10);
  const minutes = parseInt(offset.substring(offset.indexOf(':') + 1, offset.length), 10);
  return {
    hours  : isNegative ? -hours : hours,
    minutes: isNegative ? -minutes : minutes,
  };
};

module.exports = {
  convertMinutesToMilliseconds,
  getFormatedDate,
  getNowInOffset,
  getNowInOffsetWithFormat,
  getOffset,
  getTimeZoneWithOffset,
  isNowBeforeThan,
};
