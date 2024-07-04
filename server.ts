// import { createServer } from 'http';
const { createServer } = require('http')
const { Server } = require ('socket.io')
// import { Server } from 'socket.io';
// import { Socket } from 'socket.io'
const { Socket } = require('socket.io');
// import prisma from './prisma/db';
// const { prisma } = require ('./prisma/db')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}
main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', (socket: typeof Socket) => {
  console.log('A user connected:', socket.id);

  // Join a conversation room
  socket.on('join_room', (conversationId: string) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined room ${conversationId}`);
  });

  // Send a message to a conversation room
  socket.on('send_msg', async (data: any, conversationId: string) => {
    try {
      const message = await prisma.message.create({
        data: {
          content: data.content,
          authorId: data.authorId,
          conversationId: data.conversationId,
          // content: "hello 1",
          // authorId: "f16a2d25-a37e-4887-88a2-eec81c876cee",
          // conversationId: "1944c145-e80e-4286-8ec7-acf81a60eb5d",
        },
      });

      io.to(data.conversationId).emit('receive_msg', message);
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

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

module.exports = io;
