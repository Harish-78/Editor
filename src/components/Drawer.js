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
import { FaFolderPlus } from "react-icons/fa";
import { MdDelete, MdCreateNewFolder } from "react-icons/md";
import EditorScreen from "./Editor";
import "react-resizable/css/styles.css";

const ClippedDrawer = () => {
  const [folders, setFolders] = React.useState([]);
  const [drawerWidth, setDrawerWidth] = React.useState(340);
  const [selectedData, setSelectedData] = React.useState(null);

  const handleAddFolder = (parentId = null) => {
    const newFolder = {
      id: new Date().getTime(),
      name: parentId
        ? `Child ${parentId}-${folders?.length + 1}`
        : `Folder ${folders?.length + 1}`,
      children: [],
      parentId,
      data: {},
    };

    setFolders([...folders, newFolder]);
  };

  const addChild = (parentId) => {
    const newChild = {
      id: new Date().getTime(),
      name: `File`,
      children: [],
      parentId,
      data: {},
    };

    const updatedFolders = addChildToFolder([...folders], parentId, newChild);

    // Check if the parent element exists before updating the state
    if (updatedFolders) {
      setFolders(updatedFolders);
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
  const renderFolders = (folders, level = 0) => {
    return (
      <ul>
        {folders?.map((folder) => (
          <li key={folder?.id}>
            <button
              style={{
                border: "none",
                borderRadius: "5px",
                padding: "7px",

                background:
                  folder?.id === selectedData?.id ? "lightblue" : "white",
              }}
              onClick={() => {
                handleSelectChild(folder.id);
              }}
            >
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
            <IconButton
              color="error"
              sx={{
                fontSize: 14,
              }}
            >
              <MdDelete />
            </IconButton>
            {folder.children &&
              folder.children.length > 0 &&
              renderFolders(folder.children, level + 1)}
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
              <IconButton
                color="primary"
                sx={{
                  fontSize: 20,
                  marginLeft: 9,
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
          <EditorScreen
            data={selectedData?.data}
            onUpdate={(newData) => handleDataUpdate(selectedData?.id, newData)}
          />
        </div>
      </Box>
    </Box>
  );
};

export default ClippedDrawer;
