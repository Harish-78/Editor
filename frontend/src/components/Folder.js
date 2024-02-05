import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import "./Folder.css";
import { FaRegFile } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useFolderData } from "../context/FolderDataContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Folder({ handleInsertNode = () => {}, explorer }) {
  const [expand, setExpand] = useState(true);
  const [deletedData, setDeletedData] = useState(null);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const [selectedData, setSelectedData] = useState(null);
  const [renameopen, setRenameOpen] = React.useState(false);
  const [deleteopen, setDeleteOpen] = React.useState(false);
  const [deleteID, setDeleteID] = useState();
  const [renameId, setRenameId] = useState();
  const [newName, setNewName] = useState("");

  const handleClickRenameOpen = (e, id, name) => {
    setNewName(name);
    setRenameOpen(true);
    setRenameId(id);
  };
  const handleClickDeleteOpen = (id) => {
    setDeleteOpen(true);
    setDeleteID(id);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleRenameClose = () => {
    setRenameOpen(false);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
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
  };

  const onDeleteFolder = (folderId) => {
    const updatedData = deleteObjectFromArray(folderData, folderId);
    setDeletedData(updatedData);
    handleDeleteClose();
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

  const onRenameFolder = (folderId, newName) => {
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
      setSelectedData(root);
    } else {
      setSelectedData(null);
    }
    console.log(selectedData);
    for (const nestedItem of root.items) {
      const foundData = handlefileclick(nestedItem, requireFileName);
      if (foundData) {
        setSelectedData(foundData);
      }
    }
    return null;
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div>
          {explorer?._id === 1 && (
            <div className="flex justify-between m-2">
              <div>
                <p className="text-xl text-dark-purple font-serif mb-4">
                  Add Wiki
                </p>
              </div>
              <div className="absolute left-[210px] mt-4 ">
                <IconButton
                  onClick={(e) => handleNewFolder(e, true)}
                  color="primary"
                  sx={{
                    fontSize: "20px",
                  }}
                >
                  <FaRegFile />
                </IconButton>
              </div>
            </div>
          )}
        </div>

        <div className="flex ">
          {explorer?._id !== 1 && (
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
          )}
          <span
            className={`flex`}
            onClick={() => handlefileclick(explorer, explorer?.name)}
          >
            <>
              {explorer?._id !== 1 && "📄"} {explorer.name}
              {
                <div className="ml-5">
                  {explorer?.id !== 1 && (
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
                  )}

                  {explorer?._id !== 1 && (
                    <IconButton
                      onClick={() => handleClickDeleteOpen(explorer?.id)}
                      color="error"
                      sx={{
                        fontSize: "15px",
                        position: "relative",
                        bottom: "2px",
                      }}
                    >
                      <MdDelete />
                    </IconButton>
                  )}
                  {explorer?._id !== 1 && (
                    <IconButton
                      onClick={(e) =>
                        handleClickRenameOpen(e, explorer?.id, explorer?.name)
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
                  )}
                </div>
              }
            </>
          </span>
          <Dialog
            open={deleteopen}
            onClose={handleDeleteClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                handleRenameClose();
              },
            }}
          >
            <DialogTitle>Delete File </DialogTitle>
            <DialogContent>Are you sure want to delete the file?</DialogContent>
            <DialogActions>
              <Button
                onClick={handleDeleteClose}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={() => onDeleteFolder(deleteID, newName)}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={renameopen}
            onClose={handleRenameClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                handleRenameClose();
              },
            }}
          >
            <DialogTitle>Rename File Name</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                value={newName}
                label="Name"
                type="text"
                variant="standard"
                onChange={handleNameChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRenameClose}>Cancel</Button>
              <Button
                type="submit"
                onClick={() => onRenameFolder(renameId, newName)}
              >
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder && "📄"}</span>
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
