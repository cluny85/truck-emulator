const getRandom        = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomBoolean = () => Math.floor((Math.random() * 2));
const move = num => (getRandom(0, 1)
  ? num + (getRandom(1000, 50000) / 100000)
  : num - (getRandom(1000, 50000) / 100000));

module.exports = {
  getRandom,
  getRandomBoolean,
  move,
};
