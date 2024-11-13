import React, { createContext, useState, useContext } from 'react';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [inputText, setInputText] = useState('');

  return (
    <TranslationContext.Provider value={{ inputText, setInputText }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};