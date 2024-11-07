import React from 'react';
import { Routes } from './routes';
import { TranslationProvider } from './pages/context/TranslationContext';
import { BookmarkProvider } from './pages/context/BookmarkContext';

function App() {
  return (
    <BookmarkProvider>
    <TranslationProvider>
      <Routes />
    </TranslationProvider>
    </BookmarkProvider>
  );
}

export default App;
