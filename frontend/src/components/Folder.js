import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import "./Folder.css";
import { FaRegFile } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useFolderData } from "../context/FolderDataContext";

function Folder({
  handleInsertNode = () => {},
  handleRenameNode = () => {},
  explorer,
}) {
  const [hover, setHover] = React.useState(false);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const { folderData } = useFolderData();
  console.log(folderData);
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };


  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
    setHover(false);
  };

  const onDeleteFolder = (e, folderId, parentID) => {
    e.stopPropagation();

    const updatedData = deleteObjectByIdAndParentId(folderData, folderId, parentID);
    console.log("a", updatedData);
  };

  function deleteObjectByIdAndParentId(obj, idToDelete, parentIdToDelete) {
    // Check if the current object matches the id and parentID
    if (obj.id === idToDelete && obj.parentID === parentIdToDelete) {
        // Remove the object from the parent's items array
        const parentItems = obj.parentID ? obj.parentID.items : explorer.items;
        const indexToRemove = parentItems?.findIndex(item => item.id === obj.id);
        if (indexToRemove !== -1) {
            parentItems?.splice(indexToRemove, 1);
        }
        return ;
    }

    // Recursively search in the items array
    if (obj.items && obj.items.length > 0) {
        for (const item of obj.items) {
            deleteObjectByIdAndParentId(item, idToDelete, parentIdToDelete);
        }
    }
}

// Example usage:

// After deletion, you can check the updated explorer object



  const onRenameFolder = (e, folderId, newName) => {
    e.stopPropagation();
    handleRenameNode(explorer.id, folderId, newName);
  };

  const handlefileclick = (root, requireFileName) => {
    if (root.name === requireFileName) {
      console.log(root, root.data);
    }
    for (const nestedItem of root.items) {
      const foundData = handlefileclick(nestedItem, requireFileName);
      if (foundData) {
        console.log("nestedData", foundData);
      }
    }
    return null;
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="flex ">
          <IconButton
            onClick={() => setExpand(!expand)}
            sx={{
              fontSize: "14px",
              position: "relative",
              bottom: "2px",
            }}
          >
            {expand ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </IconButton>
          <span
            className="flex"
            onClick={() => handlefileclick(explorer, explorer?.name)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            📄 {explorer.name}
            {hover && (
              <div className="ml-5">
                <IconButton
                  onClick={(e) => handleNewFolder(e, true)}
                  color="primary"
                  sx={{
                    fontSize: "12px",
                    position: "relative",
                    bottom: "2px",
                  }}
                >
                  <FaRegFile />
                </IconButton>

                <IconButton
                  onClick={(e) =>
                    onDeleteFolder(e, explorer?.id, explorer?.parentID)
                  }
                  color="error"
                  sx={{
                    fontSize: "15px",
                    position: "relative",
                    bottom: "2px",
                  }}
                >
                  <MdDelete />
                </IconButton>
                <IconButton
                  onClick={(e) => onRenameFolder(e, explorer.id, "NewName")}
                  color="info"
                  sx={{
                    fontSize: "16px",
                    position: "relative",
                    bottom: "2px",
                  }}
                >
                  <MdEdit />
                </IconButton>
              </div>
            )}
          </span>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📄" : "📁"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={exp.id}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
}

export default Folder;
