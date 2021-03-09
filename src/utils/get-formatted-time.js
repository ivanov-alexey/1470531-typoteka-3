"use strict";

const {DateTime} = require(`luxon`);

module.exports.getFormattedTime = (array, field) => array.map((item) => ({
  ...item,
  [field]: DateTime
    .fromISO(item[field])
    .setLocale(`ru`)
    .toFormat(`yyyy.LL.dd, hh:mm`)
}));
