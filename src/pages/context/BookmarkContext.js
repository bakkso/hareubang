import React, { createContext, useState, useContext } from 'react';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (text) => {
    setBookmarks([...bookmarks, { id: Date.now(), text }]);
  };

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);