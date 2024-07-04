// import { createServer } from "node:http";
// import next from "next";
// // import { Server } from "socket.io";
// import prisma from './prisma/db';

const { createServer } = require('http')
const { Server } = require('socket.io')
const { next } = require('next')
const { prisma } = require ('./prisma/db')

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000', 
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log('A user connected:', socket.id);

    // Join a conversation room
    socket.on('join_room', (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room ${conversationId}`);
    });

    // Send a message to a conversation room
    socket.on('send_msg', async (data, conversationId) => {
      try {
        const message = await prisma.message.create({
          data: {
            content: data.content,
            authorId: data.authorId,
            conversationId,
          },
        });

        io.to(conversationId).emit('receive_msg', message);
      } catch (error) {
        console.error('Error creating message:', error);
        socket.emit('error', 'An error occurred while sending the message.');
      }
    });

    // Leave a conversation room
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

module.exports = io;
