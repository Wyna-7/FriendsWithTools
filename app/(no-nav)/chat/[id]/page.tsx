'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';
import { Message, Conversation } from '../../../lib/types';
import { format } from 'date-fns';
import Link from 'next/link';
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { useCurrentUserStore } from '@/app/lib/stores/test-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<any>(null);
  const { currentUserId } = useCurrentUserStore((state) => state);

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
      console.log('receive_msg', message);
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
        setMessages(data.messages || []);
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
        authorId: currentUserId, // Replace with actual user ID
        authorId: currentUserId, // Replace with actual user ID
        conversationId: id,
      };
      socket.emit('send_msg', messageData);
      setNewMessage('');

    }

  };


  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div>
      <header className=' flex items-center justify-start inset-x-0 top-0  h-20 shadow-md mb-1 bg-darkGreen'>
        <Link href='/inbox'>
          <ChevronLeftIcon className='h-9 w-9  m-4 text-white' />
        </Link>
        <img
          src='https://picsum.photos/50'
          className='rounded'
          alt={'tool picture'}
        />
        <div className='chat-info flex-col ml-6 text-white'>
          <p className='font-bold'>John: Vaccuum</p>
          <p>Daily rate: €5</p>
        </div>
      </header>
      <div className='chat-view flex-col overflow-scroll h-[43rem] w-full p-2'>
        <ul>
          {messages.map((message) => (
            <li key={message.id} className={`list-none  flex ${message.authorId === currentUserId ? 'justify-end' : 'justify-start'}`} >
              <div className={`w-fit min-w-[10rem] rounded-md m-4 p-2 ${message.authorId === currentUserId ? 'bg-green-100' : 'bg-blue-100'}`}>
                <p className='text-lg'>{message.content}</p>
                <p className='font-light text-end text-base text-slate-400'>{format(message.createdAt, 'H\':\'mm')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer className=' fixed bg-white inset-x-0 bottom-0 border-t  border-grey h-20 shadow-md p-2'>
        <div className='flex w-full max-w-sm items-center space-x-2 mt-3'>
          <Input type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type a message...' />
          <Button type='submit' onClick={handleSendMessage}>
            <PaperAirplaneIcon className='h-5 w-5' />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
