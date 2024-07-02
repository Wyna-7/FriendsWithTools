'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; 
import { ToolCard } from '@/app/lib/types'; 
import ToolPage from '@/app/components/ToolPage'; 
import Link from 'next/link';  


const ToolDetailPage = () => {
  const router = useRouter();
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
      <ToolPage tool={tool} />
    </div>
  );
};
export default ToolDetailPage;
