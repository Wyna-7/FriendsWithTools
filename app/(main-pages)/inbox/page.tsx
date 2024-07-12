'use client';

import NavBar from '../../components/NavBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import ConvoListItem from '../../components/ConvoListItem';
import { useEffect, useState } from 'react';
import { Conversation } from '../../lib/types';
import io from 'socket.io-client';


const InboxPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/conversations');
        const data: Conversation[] = await response.json();
        setConversations(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch conversations for this user');
        setLoading(false);
      }
    };

    fetchConversations();

    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
    });

    socket.on('receive_msg', (data) => {
      setConversations((prevConversations) =>
        prevConversations.map((convo) =>
          convo.id === data.conversationId ? { ...convo, messages: [...convo.messages, data] } : convo
        )
      );
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      socket.off('disconnect');
    };
  }, []);

  if (loading) {
    return <div>Loading conversations...</div>;
  };

  return (
    <div>
      <header className=' flex items-center justify-center inset-x-0 top-0 border-t  border-grey h-20 shadow-md mb-1 bg-darkGreen'>
        <h1 className='text-center text-xl font-bold text-white'>Messages</h1>
      </header>
      <ScrollArea className="h-[670px] w-[100%] p-1">
        {conversations.map(convo => (
          <li key={convo.id} className='list-none'>
            <ConvoListItem convo={convo} />
          </li>
        ))}
      </ScrollArea>
      <NavBar />
    </div>
  );
};

export default InboxPage;
