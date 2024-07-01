import React, { useState, useEffect } from 'react';
import ToolsToRent from './ToolsToRent';
import MyRequests from './MyRequests';
import { ToolCard as ToolType, ToolRequest as RequestType } from '../lib/types';

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

const fetchRequests = async (userId: string): Promise<RequestType[]> => {
  try {
    const response = await fetch(`/api/myRequests?userId=${userId}`);
    const data = await response.json();
    console.log('Requests:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch requests:', error);
    return [];
  }
};

const RentRented = () => {
  const [activeComponent, setActiveComponent] = useState<string>('toolsToRent');
  const [tools, setTools] = useState<ToolType[]>([]);
  const [requests, setRequests] = useState<RequestType[]>([]);
  const testUserId = process.env.HARDCODED_ID;

  useEffect(() => {
    const ownerId = '4e25264b-9404-46b5-9b27-549f6af6c72f'; // Replace with the actual ownerId
    const userId = '4e25264b-9404-46b5-9b27-549f6af6c72f'; // Replace with the actual userId

    if (activeComponent === 'toolsToRent') {
      fetchTools(ownerId).then(setTools);
    } else if (activeComponent === 'myRequests') {
      fetchRequests(userId).then(data => {
        console.log('Fetched requests: here', data);
        setRequests(data);
      });
    }
  }, [activeComponent]);

  const handleClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className='flex justify-around items-center'>
      <div>
        <button
          className={`w-40 rounded-none rounded-tl-lg rounded-bl-lg px-4 py-2 ${
            activeComponent === 'toolsToRent'
              ? 'bg-darkGreen text-white md:hover:bg-lightGreen'
              : 'bg-gray-200 text-gray-700'
          } transition ease-in-out duration-500`}
          onClick={() => handleClick('toolsToRent')}
        >
          My Listed Tools
        </button>
        <button
          className={`w-40 rounded-none rounded-tr-lg rounded-br-lg px-4 py-2 ${
            activeComponent === 'myRequests'
              ? 'bg-darkGreen text-white md:hover:bg-lightGreen'
              : 'bg-gray-200 text-gray-700'
          } transition ease-in-out duration-500`}
          onClick={() => handleClick('myRequests')}
        >
          My Requests
        </button>
        {activeComponent === 'toolsToRent' && <ToolsToRent tools={tools} />}
        {activeComponent === 'myRequests' && <MyRequests requests={requests} />}
      </div>
    </div>
  );
};

export default RentRented;
