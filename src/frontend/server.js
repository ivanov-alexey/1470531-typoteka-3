'use strict';

const express = require(`express`);
const http = require(`http`);
const socketIO = require(`socket.io`);
const {socketEvent} = require(`../constants`);
const {getLogger} = require(`../libs/logger`);

const logger = getLogger();
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on(socketEvent.connection, (socket) => {
  const {address: ip} = socket.handshake;

  logger.info(`SOCKETS: client connected: ${ip}`);

  socket.on(socketEvent.disconnect, () => {
    logger.info(`SOCKETS: client disconnected : ${ip}`);
  });

  socket.on(socketEvent.newComments, (data) => {
    io.broadcast.emit(socketEvent.newComments, data);
  });
});

module.exports = {express, app, server, io};
