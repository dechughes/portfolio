import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-medium">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}