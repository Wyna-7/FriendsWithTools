'use client';
import React from 'react';

const ToolsPage = () => {
  return (
    <div className="container mx-auto px-2 py-2">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Discover Your Ideal Tool Here!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-scroll mb-16">
        <div className="tool-item">Tool 1</div>
        <div className="tool-item">Tool 2</div>
        <div className="tool-item">Tool 3</div>
      </div>
    </div>
  );
};

export default ToolsPage;
