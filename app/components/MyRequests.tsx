import React, { useState, useEffect } from 'react';
import ToolCardComponent from './ToolCard';
import { Request as RequestType, ToolCard as ToolType } from '../lib/types';

const MyRequests = ({ requests }: { requests: RequestType[] }) => {
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
  const [tools, setTools] = useState<ToolType[]>([]);

  useEffect(() => {
    if (Array.isArray(requests)) {
      setFilteredRequests(requests.filter(request => request.status === statusFilter));
    } else {
      console.error('Requests is not an array:', requests);
    }
  }, [statusFilter, requests]);

  useEffect(() => {
    const fetchTools = async () => {
      const toolData = await Promise.all(
        filteredRequests.map(async (request) => {
          const response = await fetch(`/api/tools/${request.toolId}`);
          const data = await response.json();
          return { ...data, requestId: request.id, requestStatus: request.status }; // Include request metadata if needed
        })
      );
      setTools(toolData);
    };

    if (filteredRequests.length > 0) {
      fetchTools();
    }
  }, [filteredRequests]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <select
        value={statusFilter}
        onChange={handleStatusChange}
        className="mb-4 p-2 border rounded"
      >
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="declined">Declined</option>
      </select>
      <div className="flex flex-wrap justify-center">
        {filteredRequests.map((request) => {
          const tool = tools.find(tool => tool.id === request.toolId);
          if (!tool) return null;
          return (
            <ToolCardComponent key={tool.id} tool={tool} />
          );
        })}
      </div>
    </div>
  );
};

export default MyRequests;
