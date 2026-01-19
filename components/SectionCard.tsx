
import React, { useState } from 'react';
import { Shot } from '../types';

interface SectionCardProps {
  title: string;
  content: string | string[] | Shot[];
  icon: React.ReactNode;
  variant?: 'text' | 'list' | 'shots';
}

const SectionCard: React.FC<SectionCardProps> = ({ title, content, icon, variant = 'text' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let textToCopy = '';
    if (variant === 'shots') {
      textToCopy = (content as Shot[]).map(s => `Shot ${s.number}\nVisual: ${s.visual}\nAudio: ${s.audio}`).join('\n\n');
    } else if (Array.isArray(content)) {
      textToCopy = content.join('\n');
    } else {
      textToCopy = content as string;
    }
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    if (variant === 'shots' && Array.isArray(content)) {
      return (
        <div className="space-y-4">
          {(content as Shot[]).map((shot) => (
            <div key={shot.number} className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  SHOT {shot.number}
                </span>
              </div>
              <div className="flex-grow space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Visual</span>
                  <p className="text-gray-800 text-sm font-medium leading-relaxed italic border-l-2 border-red-200 pl-3">
                    {shot.visual}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Audio / Dialogue</span>
                  <p className="text-gray-900 text-base leading-relaxed">
                    {shot.audio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (variant === 'list' && Array.isArray(content)) {
      return (
        <ul className="space-y-3">
          {(content as string[]).map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-700">
              <span className="bg-red-100 text-red-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed font-medium">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
        {content as string}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md mb-6">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-red-500">{icon}</span>
          <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm">{title}</h3>
        </div>
        <button 
          onClick={handleCopy}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm"
        >
          {copied ? 'Copied!' : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default SectionCard;
