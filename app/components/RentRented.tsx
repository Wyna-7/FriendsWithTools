import React, { useState, useEffect } from 'react';
import ToolsToRent from './ToolsToRent';
import SentRequests from './SentRequests';
import ReceivedRequests from './ReceivedRequests';
import { ToolCard as ToolType, ToolRequest as RequestType } from '../lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fetchTools = async (ownerId: string): Promise<ToolType[]> => {
  try {
    const response = await fetch(`/api/myTools?ownerId=${ownerId}`);
    const data = await response.json();
    console.log('Tools:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch tools:', error);
    return [];
  }
};

const fetchRequests = async (userId: string): Promise<{ sent: RequestType[], received: RequestType[] }> => {
  try {
    const response = await fetch(`/api/myRequests?userId=${userId}`);
    const data = await response.json();
    console.log('Requests:', data);

    const sentRequests = data.filter((request: RequestType) => request.userId === userId);
    const receivedRequests = data.filter((request: RequestType) => request.userId == userId);

    return { sent: sentRequests, received: receivedRequests };
  } catch (error) {
    console.error('Failed to fetch requests:', error);
    return { sent: [], received: [] };
  }
};

const RentRented = () => {
  const [activeComponent, setActiveComponent] = useState<string>('toolsToRent');
  const [tools, setTools] = useState<ToolType[]>([]);
<<<<<<< HEAD
  const [requests, setRequests] = useState<RequestType[]>([]);
  const testUserId = process.env.HARDCODED_ID;

  useEffect(() => {
    const ownerId = '4e25264b-9404-46b5-9b27-549f6af6c72f'; // Replace with the actual ownerId
    const userId = '4e25264b-9404-46b5-9b27-549f6af6c72f'; // Replace with the actual userId
=======
  const [sentRequests, setSentRequests] = useState<RequestType[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<RequestType[]>([]);
  // const userId = process.env.HARDCODED_ID || '64243b6a-2c1b-4277-b77f-0cf29fe39109'; 
  const userId = '391442ac-518b-4d4e-a089-e53871ad22b4'; // Replace with the actual userId

  useEffect(() => {
    const ownerId = '391442ac-518b-4d4e-a089-e53871ad22b4'; // Replace with the actual ownerId
>>>>>>> febf035a2d7d02fc33ab3954c73c4c50bb0459c8

    if (activeComponent === 'toolsToRent') {
      fetchTools(ownerId).then(setTools);
    } else {
      fetchRequests(userId).then(data => {
        console.log('Fetched requests:', data);
        setSentRequests(data.sent);
        setReceivedRequests(data.received);
      });
    }
  }, [activeComponent]);

  const handleClick = (component: string) => {
    setActiveComponent(component);
  };
  
  return (
    <div className="flex flex-col h-screen">
      <header className='fixed z-40 w-full flex items-center justify-center top-0 border-t border-grey h-20 shadow-md bg-darkGreen'>
        <h1 className='text-center text-xl font-bold text-white'>Tools</h1>
      </header>
      <div className='mt-20'>
        <Tabs defaultValue='toolsToRent' onValueChange={(value) => setActiveComponent(value)} className="fixed w-full top-20 z-30 bg-white shadow-md">
          <TabsList>
            <TabsTrigger value='toolsToRent'>My Listed Tools</TabsTrigger>
            <TabsTrigger value='sentRequests'>Sent Requests</TabsTrigger>
            <TabsTrigger value='receivedRequests'>Received Requests</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className='mt-10 flex-1 overflow-y-auto mb-20'>
        <Tabs defaultValue='toolsToRent' value={activeComponent} onValueChange={setActiveComponent}>
          <TabsContent value='toolsToRent'>
            <ToolsToRent tools={tools} />
          </TabsContent>
          <TabsContent value='sentRequests'>
            <SentRequests requests={sentRequests} />
          </TabsContent>
          <TabsContent value='receivedRequests'>
            <ReceivedRequests requests={receivedRequests} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RentRented;
