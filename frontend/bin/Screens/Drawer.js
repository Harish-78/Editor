import React from "react";
import { Resizable } from "react-resizable";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { FaFolder } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { MdDelete, MdCreateNewFolder } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import { IoIosArrowDown } from "react-icons/io";

const ClippedDrawer = () => {
  const [folders, setFolders] = React.useState([]);
  const [drawerWidth, setDrawerWidth] = React.useState(340);
  const [selectedData, setSelectedData] = React.useState(null);
  const [arrowIcon, setArrowIcon] = React.useState(false);

  //delete
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickDeleteOpen = (id) => {
    setDeleteOpen(true);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    enqueueSnackbar("Delete unsuccessful", {
      variant: "error",
      autoHideDuration: 1000,
    });
  };

  const handleAddFolder = (parentId = null) => {
    const defaultFolderName = parentId
      ? `Child ${parentId}-${folders?.length + 1}`
      : `Folder ${folders?.length + 1}`;

    const folderName = prompt("Enter the folder name:", defaultFolderName);

    if (folderName !== null && folderName.trim() !== "") {
      const newFolder = {
        id: new Date().getTime(),
        updationTime: "",
        name: folderName,
        children: [],
        parentId,
        data: {},
      };

      setFolders([...folders, newFolder]);
    } else {
      alert("Folder name cannot be empty. Please try again.");
    }
  };

  const addChild = (parentId) => {
    const defaultFileName = "New File";
    const fileName = prompt("Enter the file name:", defaultFileName);
    if (fileName !== null && fileName.trim() !== "") {
      const newChild = {
        id: new Date().getTime(),
        updationTime: "",
        name: fileName,
        children: [],
        parentId,
        data: {},
      };
      const updatedFolders = addChildToFolder([...folders], parentId, newChild);

      if (updatedFolders) {
        setFolders(updatedFolders);
      }
    } else {
      alert("Folder name cannot be empty. Please try again.");
    }
  };

  const addChildToFolder = (currentFolders, parentId, newChild) => {
    return currentFolders?.map((folder) => {
      if (folder?.id === parentId) {
        return { ...folder, children: [...folder?.children, newChild] };
      } else if (folder?.children && folder?.children?.length > 0) {
        const updatedChildren = addChildToFolder(
          folder?.children,
          parentId,
          newChild
        );
        return { ...folder, children: updatedChildren };
      } else {
        return folder;
      }
    });
  };

  const findFileById = (currentFolders, targetId) => {
    for (const folder of currentFolders) {
      if (folder.id === targetId) {
        return folder;
      }

      if (folder.children && folder.children.length > 0) {
        const foundFile = findFileById(folder.children, targetId);
        if (foundFile) {
          return foundFile;
        }
      }
    }

    return null;
  };

  const handleSelectChild = (id) => {
    const selectedFile = findFileById(folders, id);
    if (selectedFile) {
      setSelectedData(selectedFile);
      console.log("Selected File Data:", selectedFile);
      setSelectedData(selectedFile);
    } else {
      console.log("File not found");
      setSelectedData(null);
    }
  };

  console.log(folders);

  const handleEditFolderName = (id) => {
    const currentFolder = findFileById(folders, id);

    if (currentFolder) {
      const editedName = prompt(
        "Enter the new folder name:",
        currentFolder.name
      );

      if (editedName !== null && editedName.trim() !== "") {
        const updatedFolders = editFolderNameById([...folders], id, editedName);
        if (updatedFolders) {
          setFolders(updatedFolders);
        }
      } else {
        alert("Folder name cannot be empty. Please try again.");
      }
    }
  };

  const editFolderNameById = (currentFolders, targetId, newName) => {
    return currentFolders.map((folder) => {
      if (folder.id === targetId) {
        return { ...folder, name: newName };
      } else if (folder.children && folder.children.length > 0) {
        const updatedChildren = editFolderNameById(
          folder.children,
          targetId,
          newName
        );
        return { ...folder, children: updatedChildren };
      } else {
        return folder;
      }
    });
  };

  const handleDeleteFolder = (id) => {
    const updatedFolders = deleteFolderById([...folders], id);
    if (updatedFolders) {
      setFolders(updatedFolders);
      setSelectedData(null);
      setDeleteOpen(false);
      enqueueSnackbar("Deleted Successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
    }
  };

  const deleteFolderById = (currentFolders, targetId) => {
    let updatedFolders = null;

    const findAndDelete = (folders) => {
      for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];

        if (folder.id === targetId) {
          // Folder found, remove it
          folders.splice(i, 1);
          updatedFolders = [...currentFolders];
          break;
        }

        if (folder.children && folder.children.length > 0) {
          findAndDelete(folder.children);

          if (updatedFolders) {
            break; // Exit the loop if deletion has already occurred
          }
        }
      }
    };

    findAndDelete(currentFolders);

    return updatedFolders;
  };

  const renderFolders = (folders, level = 0) => {
    return (
      <ul>
        {folders?.map((folder) => (
          <li key={folder?.id} style={{ listStyle: "none" }}>
            <div>
              <IconButton
                sx={{
                  fontSize: "15px",
                }}
                onClick={() => {
                  setArrowIcon(!arrowIcon);
                }}
              >
                {arrowIcon ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </IconButton>
              <button
                style={{
                  border: "none",
                  borderRadius: "5px",
                  padding: "2px 9px 2px 3px ",

                  background:
                    folder?.id === selectedData?.id ? "lightblue" : "white",
                }}
                onClick={() => {
                  handleSelectChild(folder.id);
                }}
                onDoubleClick={() => handleEditFolderName(folder.id)}
              >
                <IconButton
                  sx={{
                    fontSize: "15px",
                    marginBottom: "5px",
                  }}
                >
                  <FaFolder />
                </IconButton>
                {folder?.name}
              </button>
              <IconButton
                onClick={() => addChild(folder.id)}
                sx={{
                  marginLeft: "4px",
                  fontSize: 14,
                }}
                color="primary"
              >
                <FaFolderPlus />
              </IconButton>
              {selectedData?.id === folder?.id && (
                <IconButton
                  onClick={() => {
                    handleClickDeleteOpen(folder?.id);
                  }}
                  color="error"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  <MdDelete />
                </IconButton>
              )}
              {selectedData?.id === folder?.id && (
                <IconButton
                  onClick={() => handleEditFolderName(folder.id)}
                  sx={{
                    fontSize: 14,
                  }}
                >
                  <MdModeEditOutline />
                </IconButton>
              )}

              {folder.children &&
                folder.children.length > 0 &&
                renderFolders(folder.children, level + 1)}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const onResize = (event, { size }) => {
    setDrawerWidth(size.width);
  };

  const handleDataUpdate = (id, newData) => {
    const updatedFolders = updateDataById([...folders], id, newData);
    if (updatedFolders) {
      setFolders(updatedFolders);
    }
  };

  const updateDataById = (currentFolders, targetId, newData) => {
    return currentFolders?.map((folder) => {
      if (folder?.id === targetId) {
        return { ...folder, data: newData };
      } else if (folder?.children && folder?.children?.length > 0) {
        const updatedChildren = updateDataById(
          folder?.children,
          targetId,
          newData
        );
        return { ...folder, children: updatedChildren };
      } else {
        return folder;
      }
    });
  };
  const dateObject = new Date(selectedData?.id);
  const createdTime = dateObject.toLocaleString();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Wiki Spaces
          </Typography>
        </Toolbar>
      </AppBar>
      <Resizable
        width={drawerWidth}
        height={600}
        style={{ position: "relative", overflow: "hidden" }}
        minConstraints={[240, 600]}
        maxConstraints={[600, 600]}
        onResize={onResize}
        resizeHandles={["e"]}
        axis="x"
      >
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <div>
            <div
              style={{ display: "flex", justifyContent: "end", margin: "4px" }}
            >
              <h5>ADD WIKI</h5>
              <IconButton
                color="primary"
                sx={{
                  fontSize: 20,
                  marginRight: "4px",
                  marginLeft: "4px",
                }}
                onClick={() => handleAddFolder()}
              >
                <MdCreateNewFolder />
              </IconButton>
            </div>
            <List>{renderFolders(folders)}</List>
          </div>
        </Drawer>
      </Resizable>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div>
          <Dialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDeleteClose}
                variant="contained"
                autoFocus
                color="error"
              >
                NO
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleDeleteFolder(deleteId);
                }}
                color="success"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "15px",
              padding: "5px",
            }}
          >
            <div>{selectedData && `${selectedData?.name}`}</div>
            <div>{selectedData && ` Created on : ${createdTime}`}</div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ClippedDrawer;
