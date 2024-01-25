import { IconButton } from "@mui/material";
import { useState } from "react";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function Folder({
  handleInsertNode = () => {},
  handleDeleteNode = () => {},
  handleRenameNode = () => {},
  explorer,
}) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

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

  const onDeleteFolder = (e, folderId) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id, folderId);
  };

  const onRenameFolder = (e, folderId, newName) => {
    e.stopPropagation();
    handleRenameNode(explorer.id, folderId, newName);
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder">
          <IconButton
            onClick={() => setExpand(!expand)}
            sx={{
              fontSize: "16px",
            }}
          >
            {expand ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </IconButton>
          <span>
            {!expand ? "📁" : "📂"} {explorer.name}
          </span>

          <div>
            <IconButton
              onClick={(e) => handleNewFolder(e, true)}
              color="primary"
            >
              <CreateNewFolderIcon />
            </IconButton>
            <IconButton
              onClick={(e) => handleNewFolder(e, false)}
              color="secondary"
            >
              <NoteAddIcon />
            </IconButton>
            <IconButton
              onClick={(e) => onDeleteFolder(e, explorer.id)}
              color="error"
              sx={{
                fontSize: "16px",
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={(e) => onRenameFolder(e, explorer.id, "NewName")}
              color="info"
            >
              <EditIcon />
            </IconButton>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
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
