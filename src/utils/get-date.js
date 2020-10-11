'use strict';

const DateTime = require('luxon').DateTime;
const {getRandomInt} = require('./get-random-int');
const {TimeConfig} = require('../constants');

module.exports.getDate = () => DateTime.fromObject({
  year: getRandomInt(TimeConfig.minYear, TimeConfig.maxYear),
  month: getRandomInt(TimeConfig.minMonth, TimeConfig.maxMonth),
  day: getRandomInt(TimeConfig.minDay, TimeConfig.maxDay),
  hour: getRandomInt(TimeConfig.minHour, TimeConfig.maxHour),
  minute: getRandomInt(TimeConfig.minMinute, TimeConfig.maxMinute),
  second: getRandomInt(TimeConfig.minSecond, TimeConfig.maxSecond)
}).toISO();
