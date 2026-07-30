import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-slate-200">
      <h1 className="text-3xl font-bold text-white mb-4">About ProjexAI</h1>
      <p className="text-slate-400 mb-6 leading-relaxed">
        ProjexAI is a next-generation freelance marketplace powered by AI. We connect talented clients and freelancers with smart project matching, seamless proposal bidding, and integrated AI tools.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">Our Mission</h3>
          <p className="text-slate-400 text-sm">
            Empowering developers and clients to collaborate effectively with modern web technologies and real-time AI assistance.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">Key Features</h3>
          <p className="text-slate-400 text-sm">
            Automated proposal evaluation, smart skill matching, transparent bidding systems, and secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
};