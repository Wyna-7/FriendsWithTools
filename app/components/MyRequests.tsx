

import React, { useState, useEffect } from 'react';
import RequestToolCard from './RequestToolCard';
import { ToolRequest as RequestType, ToolCard as ToolType } from '../lib/types';

const MyRequests = ({ requests }: { requests: RequestType[] }) => {
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
  const [tools, setTools] = useState<Array<{ tool: ToolType; request: RequestType }>>([]);

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

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const handleDelete = (requestId: string) => {
    setFilteredRequests(filteredRequests.filter(request => request.id !== requestId));
    setTools(tools.filter(({ request }) => request.id !== requestId));
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
      <div className="flex flex-col place-content-center">
        {tools.map(({ tool, request }) => (
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

export default MyRequests;
