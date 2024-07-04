// pages/chat/[id].tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Update to useParams from next/navigation
import io from 'socket.io-client';
import { Message, Conversation } from '../../../lib/types';
import NavBar from '../../../components/NavBar';
import Link from 'next/link';
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { useCurrentUserStore } from '@/app/lib/stores/test-store';

const ChatPage = () => {
  const { id } = useParams(); // Use useParams to get the id
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<any>(null);
  const { currentUserId, setCurrentUserId } = useCurrentUserStore((state) => state);

  useEffect(() => {
    if (!id) return;

    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server:', newSocket.id);
      newSocket.emit('join_room', id);
      console.log('join_room', id);
    });

    newSocket.on('receive_msg', (message: Message) => {
      console.log('receive_msg', message)
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.off('disconnect');
    };
  }, [id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/conversations/${id}`);
        const data: Conversation = await response.json();
        setMessages(data.messages || []);  // Provide a default empty array
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch messages');
        setLoading(false);
      }
    };

    if (id) {
      fetchMessages();
    }
  }, [id]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        content: newMessage,
        authorId: 'f16a2d25-a37e-4887-88a2-eec81c876cee', // Replace with actual user ID
        conversationId: id,
      };
      socket.emit('send_msg', messageData);
      setNewMessage('');

      // try {
      //   const response = await fetch('/api/conversations', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(messageData),
      //   });

      //   if (response.ok) {
      //     const savedMessage = await response.json();
      //     socket.emit('send_msg', savedMessage, id);
      //     setNewMessage('');
      //   } else {
      //     console.error('Failed to send message');
      //   }
      // } catch (error) {
      //   console.error('Failed to send message', error);
      // }
    }
    
  };


  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div>
      <header className=' flex items-center justify-start inset-x-0 top-0 border-t  border-grey h-20 shadow-md mb-1 bg-slate-200'>
        <Link href='/inbox'>
          <ChevronLeftIcon className='h-9 w-9 border m-4' />
        </Link>
        <img
          src='https://picsum.photos/50'
          className='rounded'
          alt={'tool picture'}
        />
        <div className='chat-info flex-col ml-6'>
          <p className='font-bold'>Daily rate here</p>
          <p>Tool name here</p>
        </div>
      </header>
      <div className='chat-view flex-col overflow-scroll h-[43rem] w-full p-2'>
        <ul>
          {messages.map((message) => (
            <li key={message.id} className={`list-none flex ${message.authorId === currentUserId ? "justify-end": "justify-start"}`} >
              <div>
                <p>{message.authorId}</p>
                <p>{message.content}</p>
                <p>{new Date(message.createdAt).toLocaleTimeString()}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
        <div className='flex w-full max-w-sm items-center space-x-2 mt-3'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type a message...'
        />
        <button
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
      <NavBar />
    </div>
  );
};

export default ChatPage;
