import React, { useState, useEffect } from 'react';
import ToolsToRent from './ToolsToRent';
import SentRequests from './SentRequests';
import ReceivedRequests from './ReceivedRequests';
import { ToolCard as ToolType, ToolRequest as RequestType } from '../lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCurrentUserStore } from '../lib/stores/test-store';


const RentRented = () => {
  const [activeComponent, setActiveComponent] = useState<string>('toolsToRent');
  const [tools, setTools] = useState<ToolType[]>([]);
  const [sentRequests, setSentRequests] = useState<RequestType[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<RequestType[]>([]);
  const { currentUserId } = useCurrentUserStore((state) => state);

  console.log('currentUserId from RentRented', currentUserId);
  useEffect(() => {

    const fetchTools = async (): Promise<ToolType[]> => {
      try {
        const response = await fetch(`/api/myTools/${currentUserId}`);
        const data = await response.json();
        console.log('Tools:', data);
        return data;
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        return [];
      }
    };

    const fetchRequests = async (): Promise<{ sent: RequestType[], received: RequestType[] }> => {
      try {
        const response = await fetch(`/api/myRequestsUser/${currentUserId}`);
        const data = await response.json();
        console.log('Requests:', data);

        const sentRequests = data.filter((request: RequestType) => request.userId === currentUserId);
        const receivedRequests = data.filter((request: RequestType) => request.userId === currentUserId);

        return { sent: sentRequests, received: receivedRequests };
      } catch (error) {
        console.error('Failed to fetch requests:', error);
        return { sent: [], received: [] };
      }
    };


    if (activeComponent === 'toolsToRent') {
      fetchTools().then((data) => setTools(data));
    } else {
      fetchRequests().then(data => {
        console.log('Fetched requests:', data);
        setSentRequests(data.sent);
        setReceivedRequests(data.received);
      });
    }
  }, [sentRequests, activeComponent, receivedRequests,currentUserId]);


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
