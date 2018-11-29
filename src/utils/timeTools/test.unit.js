const { expect } = require('chai');
const moment     = require('moment');
const {
  convertMinutesToMilliseconds,
  getTimeZoneWithOffset,
  getOffset,
  getNowInOffset,
  getNowInOffsetWithFormat,
  isNowBeforeThan,
} = require('./index');

describe('[unit] Time tools', () => {
  describe('.convertMinutesToMilliseconds', () => {
    it('must transform 1 min to millisecons', () => {
      const result = convertMinutesToMilliseconds(1);
      expect(result).to.be.eq(60000);
    });
    it('must transform 5 min to millisecons', () => {
      const result = convertMinutesToMilliseconds(5);
      expect(result).to.be.eq(300000);
    });
  });
  describe('.getTimeZoneWithOffset', () => {
    it('must get the hour of Europe/Madrid', () => {
      const result = getTimeZoneWithOffset('2018-10-05 18:00', 'Europe/Madrid');
      expect(result instanceof moment);
    });
    it('must get the hour of Europe/Madrid in winter time', () => {
      const result = getTimeZoneWithOffset('2018-11-05 18:00', 'Europe/Madrid');
      expect(result instanceof moment);
    });
    it('must get the hour of Asia/Taipei', () => {
      const result = getTimeZoneWithOffset('2018-10-05 18:00', 'Asia/Taipei');
      expect(result instanceof moment);
    });
  });

  describe('.getNowInOffset', () => {
    it('must get the hour of Europe/Madrid', () => {
      const result = getNowInOffset('Europe/Madrid');
      expect(result instanceof moment);
    });
    it('must get the hour of Asia/Taipei', () => {
      const result = getNowInOffset('Asia/Taipei');
      expect(result instanceof moment);
    });
  });

  describe('.getNowInOffsetWithFormat', () => {
    it('must get the hour of Europe/Madrid', () => {
      const result = getNowInOffsetWithFormat('Europe/Madrid');
      expect(typeof result === 'string');
    });
    it('must get the hour of Asia/Taipei', () => {
      const result = getNowInOffsetWithFormat('Asia/Taipei');
      expect(typeof result === 'string');
    });
  });

  describe('.getOffset', () => {
    const keys = ['hours', 'minutes'];
    const timezones = {
      mad      : 'Europe/Madrid',
      australia: 'Australia/Eucla',
      america  : 'America/Antigua',
    };
    it('must return offset', () => {
      const result = getOffset(timezones.mad);
      expect(result).to.have.all.keys(keys);
    });
    it('must return offset of Australian time (with minutes)', () => {
      const result = getOffset(timezones.australia);
      expect(result).to.have.all.keys(keys);
      expect(result.hours).to.be.eq(8);
      expect(result.minutes).to.be.eq(45);
    });
    it('must return offset of American time (with minutes)', () => {
      const result = getOffset(timezones.america);
      expect(result).to.have.all.keys(keys);
      expect(result.hours).to.be.eq(-4);
      expect(result.minutes).to.be.eq(0);
    });
  });

  describe('.isNowBeforeThan', () => {
    it('must check if 2 hours later if before than NOW', () => {
      const result = isNowBeforeThan(moment().add({ h: 2 }));
      expect(result).to.be.eq(true);
    });
    it('must check if 2 hours before NOW is before NOW', () => {
      const result = isNowBeforeThan(moment().subtract({ h: 2 }));
      expect(result).to.be.eq(false);
    });
  });
});
