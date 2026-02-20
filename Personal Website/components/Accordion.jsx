import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Accordion = ({ sections }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const togglePanel = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="w-full">
      {sections.map((section, index) => (
        <div key={index} className="mb-4 section-card">
          <button 
            className="w-full flex justify-between items-center h2 text-left py-2"
            onClick={() => togglePanel(index)}
          >
            {section.title}
            <span className="text-2xl font-bold">
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          
          {openIndex === index && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-2 overflow-hidden"
            >
              {section.content}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;