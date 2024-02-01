import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import "./Folder.css";
import { FaRegFile } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useFolderData } from "../context/FolderDataContext";

function Folder({ handleInsertNode = () => {}, explorer }) {
  const [hover, setHover] = React.useState(false);
  const [expand, setExpand] = useState(false);
  const [deletedData, setDeletedData] = useState(null);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(explorer.name);

  const [selectedData, setSelectedData] = useState([]);
  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    onRenameFolder(explorer.id, newName);
  };

  const { folderData, setSharedData } = useFolderData();

  React.useEffect(() => {
    console.log(deletedData);
    setSharedData(deletedData ? deletedData : folderData);
  }, [deletedData, folderData, setSharedData]);

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

  const onDeleteFolder = (e, folderId) => {
    e.stopPropagation();

    const updatedData = deleteObjectFromArray(folderData, folderId);
    setDeletedData(updatedData);
  };

  function deleteObjectFromArray(rootObject, objectId) {
    function deleteRecursive(arr, parentId) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === objectId) {
          arr.splice(i, 1);
          return;
        }

        if (arr[i].items.length > 0) {
          deleteRecursive(arr[i].items, arr[i].id);
        }
      }
    }

    deleteRecursive(rootObject.items, rootObject.id);
    return rootObject;
  }

  const onRenameFolder = (e, folderId, newName) => {
    handleRenameNode(folderData, folderId, newName);
  };

  function handleRenameNode(rootObject, objectId, newName) {
    function renameRecursive(arr, parentId, newName) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === objectId) {
          arr[i].name = newName;
          return;
        }

        if (arr[i].items.length > 0) {
          renameRecursive(arr[i].items, arr[i].id, newName); // Pass newName to the recursive call
        }
      }
    }

    renameRecursive(rootObject.items, rootObject.id, newName);
    return rootObject;
  }

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
            className={`flex ${editing ? "editing" : ""} background:
            ${explorer?.id === selectedData?.id} ? "lightblue" : "white",
      `}
            onDoubleClick={handleDoubleClick}
            onClick={() => handlefileclick(explorer, explorer?.name)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {editing ? (
              <input
                type="text"
                value={newName}
                onChange={handleNameChange}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <>
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
                      onClick={(e) =>
                        onRenameFolder(e, explorer?.id, "NewName")
                      }
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
              </>
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
