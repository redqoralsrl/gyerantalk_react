#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('./app');
const debug = require('debug')('react-backend:server');
const http = require('http');
const { Chat } = require('./public/models/Chat');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Create Socket.io
 */
const io = require("socket.io")(server,{
  cors : {
    origin : "*",
  },
})

io.on("connection",(socket)=>{

  console.log('소켓실행');
  
  // 대화에 참여
  const {roomId} = socket.handshake.query;
  socket.join(roomId, ()=>{
    console.log('방생성');
  });

  // 메세지 전송시
  socket.on('newChatMessage',(data)=>{
    console.log(data.user);

    let body = {
      message: data.message,
      senderId: data.senderId,
      sendUser: data.sendUser,
      roomName: data.roomName,
      user : data.user,
      toUser : data.toUser,
    }
    
    const chat = new Chat(body);

    chat.save((err,doc)=>{
      console.log('성공');
    })
    
    io.in(roomId).emit('newChatMessage',data);
  })

  // 방을 나가거나 소켓이 닫히면
  socket.on('disconnect', () =>{
    socket.leave(roomId);
  })

})
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
