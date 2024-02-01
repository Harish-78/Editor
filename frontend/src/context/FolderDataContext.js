// FolderDataContext.js
import React, { createContext, useContext, useState } from "react";

const FolderDataContext = createContext();

export const FolderDataProvider = ({ children }) => {
  const [folderData, setFolderData] = useState({});

  const setSharedData = (newData) => {
    setFolderData(newData);
  };

  return (
    <FolderDataContext.Provider value={{ folderData, setSharedData }}>
      {children}
    </FolderDataContext.Provider>
  );
};

export const useFolderData = () => {
  return useContext(FolderDataContext);
};
