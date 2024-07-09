import React, { useState, useEffect } from 'react';
import RequestToolCard from './RequestToolCard';
import { ToolRequest as RequestType, ToolCard as ToolType } from '../lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FaChevronDown } from 'react-icons/fa'; // Import the arrow icon


const SentRequests = ({ requests }: { requests: RequestType[] }) => {
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
  const [tools, setTools] = useState<Array<{ tool: ToolType; request: RequestType }>>([]);

  useEffect(() => {
    setFilteredRequests(requests.filter(request => request.status === statusFilter));
  }, [statusFilter, requests]);

  useEffect(() => {
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
  }, [filteredRequests]);

  const handleDelete = (requestId: string) => {
    setFilteredRequests(filteredRequests.filter(request => request.id !== requestId));
    setTools(tools.filter(({ request }) => request.id !== requestId));
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="mb-4 p-2 border rounded flex items-center bg-gray-100 hover:bg-gray-300 text-black">
            {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
            <FaChevronDown className="ml-2" /> {/* Add the arrow icon */}
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
          tools.map(({ tool, request }) => (
            <RequestToolCard
              key={request.id}
              tool={tool}
              request={request}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default SentRequests;
