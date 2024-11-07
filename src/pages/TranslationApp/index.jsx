import React, { useState, useCallback } from 'react';
import QuickPage from '../Quick';
import RegularPage from '../Regular';

const TranslationApp = () => {
  const [selectedSentence, setSelectedSentence] = useState('');
  const [currentPage, setCurrentPage] = useState('quick');

  const handleSentenceSelect = useCallback((sentence) => {
    console.log("handleSentenceSelect called in TranslationApp:", sentence);
    setSelectedSentence(sentence);
    setCurrentPage('regular');
  }, []);

  console.log("Rendering TranslationApp, handleSentenceSelect:", handleSentenceSelect);

  return (
    <div>
      {currentPage === 'quick' ? (
        <QuickPage onSentenceSelect={handleSentenceSelect} />
      ) : (
        <RegularPage 
          inputTextProp={selectedSentence} 
          onBackToQuick={() => setCurrentPage('quick')} 
        />
      )}
    </div>
  );
};

export default TranslationApp;