// FolderDataContext.js
import React, { createContext, useContext, useState } from "react";
import explorer from "../../src/assets/Folder Data/folderData";

const FolderDataContext = createContext();

export const FolderDataProvider = ({ children }) => {
  const [folderData, setFolderData] = useState(explorer);

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
