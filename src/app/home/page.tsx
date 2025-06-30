import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Archive</h1>
      <p className="text-lg text-gray-600 mb-8">Your vinyl collection awaits</p>
      <a 
        href="/covers" 
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        View Collection
      </a>
    </div>
  );
};

export default HomePage;