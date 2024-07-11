import React, { useState, useEffect } from 'react';
import { ToolRequest as RequestType, ToolCard as ToolType } from '../lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button'; // Adjust the import path based on your project structure
import { FaChevronDown } from 'react-icons/fa'; // Import the arrow icon
import { currentUser } from '@clerk/nextjs/server';
import { useCurrentUserStore } from '../lib/stores/test-store';


const ReceivedRequests = ({ requests }: { requests: RequestType[] }) => {
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
  const [tools, setTools] = useState<Array<{ tool: ToolType; request: RequestType }>>([]);
  const { currentUserId } = useCurrentUserStore((state) => state);

  useEffect(() => {
    console.log('got triggered 1');
    setFilteredRequests(requests.filter(request => request.status === statusFilter));
  }, [statusFilter, requests]);

  useEffect(() => {
    console.log('got triggered 2');
    const fetchTools = async () => {
      const toolData = await Promise.all(
        filteredRequests.map(async (request) => {
          const response = await fetch(`/api/tools/${request.toolId}`);
          const tool = await response.json();
          return { tool, request };
        })
      );
      setTools(toolData);
    };

    if (filteredRequests.length > 0) {
      fetchTools();
    }
  }, [filteredRequests, statusFilter]);

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleUpdateStatus = async (requestId: string, status: string) => {
    try {
      const response = await fetch(`/api/myRequests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update request status');
      }

      setTools(tools.map(({ tool, request }) => (
        request.id === requestId ? { tool, request: { ...request, status } } : { tool, request }
      )));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="mb-4 p-2 border rounded flex items-center bg-gray-100 hover:bg-gray-300 text-black">
            {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
            <FaChevronDown className="ml-2 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => handleStatusChange('pending')}>
            Pending
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleStatusChange('accepted')}>
            Accepted
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleStatusChange('declined')}>
            Declined
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-wrap justify-center">
        {filteredRequests.length === 0 ?
          <h1>You have no requests</h1>          
          :
          tools.filter(tool => tool.tool.ownerId === currentUserId).map(({ tool, request }) => (
            <div key={request.id} className="border-slate-50 w-[358.203px] border-4 p-4 rounded-xl shadow-xl shadow-slate-400 flex flex-col items-center m-4">
              <div
                className="relative w-full h-64 rounded-m overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${tool.picture || 'https://shorturl.at/PyeKu'})` }}
              />

              <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-lg font-semibold">{tool.name}</h1>
                <p className="text-gray-600">{tool.description}</p>
              </div>

              <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Request Information</h2>
                <p className="text-gray-600">Status: {request.status}</p>
                <p className="text-gray-600">Requester: {request.user.name} {request.user.lastName} </p>
                <p className="text-gray-600">Request Sent: {new Date(request.createdAt).toLocaleDateString()}</p>
              </div>

              {request.status === 'pending' && (
                <div className="flex space-x-4 mt-7 mb-4">
                  <button
                    className="bg-darkGreen text-white py-4 px-10 rounded mt-2"
                    onClick={() => handleUpdateStatus(request.id, 'accepted')}
                  >
                  Accept
                  </button>
                  <button
                    className="bg-red-600 text-white py-4 px-10 rounded mt-2"
                    onClick={() => handleUpdateStatus(request.id, 'declined')}
                  >
                  Decline
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};


export default ReceivedRequests;
