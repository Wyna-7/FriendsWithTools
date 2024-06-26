'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { ToolCard } from '@/app/lib/types'; 

const ToolDetailPage = () => {
  const { id } = useParams();
  const [tool, setTool] = useState<ToolCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchTool = async () => {
        try {
          const response = await fetch(`/api/tools/${id}`);
          if (!response.ok) {
            throw new Error('Tool not found');
          }
          const data: ToolCard = await response.json();
          setTool(data);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch tool:', error);
          setLoading(false);
        }
      };

      fetchTool();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <div>
      <h1>{tool.name}</h1>
      <p>{tool.description}</p>
      <p>Location: {tool.location}</p>
      <p>Daily Rate: ${tool.dailyRate}</p>
      <p>Weekly Rate: ${tool.weeklyRate}</p>
      <p>Monthly Rate: ${tool.monthlyRate}</p>
      <img src={tool.picture} alt={tool.name} width="200" />
      <p>Category: {tool.toolCategoryId}</p>
      <p>Owner: {tool.ownerId}</p>
      <h3>Reviews</h3>

    </div>
  );
};

export default ToolDetailPage;
