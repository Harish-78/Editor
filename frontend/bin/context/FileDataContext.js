// FileDataContext.js
import React, { createContext, useContext, useState } from 'react';

const FileDataContext = createContext();

export const FileDataProvider = ({ children }) => {
  const [fileData, setFileData] = useState([]);

  const setfileUpdateData = newData => {
    setFileData(newData);
  };

  return (
    <FileDataContext.Provider value={{ fileData, setfileUpdateData }}>
      {children}
    </FileDataContext.Provider>
  );
};

export const useData = () => {
  return useContext(FileDataContext);
};
