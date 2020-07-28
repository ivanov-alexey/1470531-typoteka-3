'use strict';

const fs = require(`fs`);
const pinoms = require(`pino-multi-stream`);

const prettyStream = pinoms.prettyStream({
  prettyPrint: {
    colorize: true,
    translateTime: `SYS:standard`,
    ignore: `hostname,pid`
  },
  prettifier: require(`pino-pretty`)
});
const level = process.env.LOG_LEVEL || `info`;
const streams = [
  {level, stream: fs.createWriteStream(`./src/service/logs/logs.txt`)},
  {level, stream: prettyStream}
];

const logger = pinoms({
  name: `pino-and-express`,
  level,
}, pinoms.multistream(streams));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
