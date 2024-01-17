import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { AiFillFolderOpen } from "react-icons/ai";
import ListItemText from "@mui/material/ListItemText";
import { FaFile, FaFolder, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { FiFilePlus } from "react-icons/fi";
import { LuMinimize } from "react-icons/lu";
import { IconButton } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import exampleData from "./editor/data/exampleData";
import EditorScreen from "./Editor";
import Tree from "react-animated-tree";

const drawerWidth = 240;

export default function ClippedDrawer() {
  const emptyData = {
    time: "",
    blocks: [{}],
  };
  const intialList = [
    {
      file: "New File",
      editorData: exampleData,
    },
  ];

  const [list, setList] = React.useState(intialList);
  const [visibleIcons, setVisibleIcons] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState([]);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null); // New state for selected item
  const [selectedItemData, setSelectedItemData] = React.useState(emptyData);
  const [folders, setFolders] = React.useState([]);

  // Function to toggle the expanded state of a specific item
  const toggleItemExpansion = (index) => {
    setExpandedItems((prev) => {
      const isExpanded = prev.includes(index);
      return isExpanded
        ? prev.filter((item) => item !== index)
        : [...prev, index];
    });
  };

  // Handle double click to start editing
  const handleDoubleClick = (index) => {
    setEditingIndex(index);
    setEditValue(list[index]?.folder || list[index]?.file || "");
  };
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  // Handle blur or Enter key press to finish editing
  const handleEditBlurOrEnter = (index) => {
    if (editValue.trim() !== "") {
      setList((prev) => {
        const newList = [...prev];
        newList[index] = {
          ...newList[index],
          folder: editValue,
          file: editValue,
        };
        return newList;
      });
    }
    setEditingIndex(null);
  };

  //add folder
  const handleAddFolder = () => {
    setList((prev) => {
      const oldData = [...prev];
      oldData.push({
        folder: "New Folder",
        editorData: exampleData,
      });
      return oldData;
    });
  };

  //add file

  const handleAddFile = () => {
    setList((prev) => {
      const oldData = [...prev];
      oldData.push({
        file: "New File",
        editorData: exampleData,
      });
      return oldData;
    });
  };

  //handleDelete
  const handleDelete = (index) => {
    list.splice(index, 1);
    setList(() => {
      return list;
    });
    if (selectedItem === index) {
      setSelectedItem(null);
    }
  };

  const handleItemClick = (index) => {
    setSelectedItem(index);
    setSelectedItemData(list[index]?.editorData);
    console.log(`Item ${index} selected`);
  };

  const addFolder = (parentId = null) => {
    const newFolder = {
      id: new Date().getTime(),
      name: parentId
        ? `Child ${parentId}-${folders.length + 1}`
        : `Folder ${folders.length + 1}`,
      children: [],
      parentId,
    };

    setFolders([...folders, newFolder]);
  };

  const addChild = (parentId) => {
    const newChild = {
      id: new Date().getTime(),
      name: `File`,
      children: [],
      parentId,
    };

    const updatedFolders = addChildToFolder([...folders], parentId, newChild);

    setFolders(updatedFolders);
  };

  const addChildToFolder = (currentFolders, parentId, newChild) => {
    return currentFolders.map((folder) => {
      if (folder.id === parentId) {
        return { ...folder, children: [...folder.children, newChild] };
      } else if (folder.children && folder.children.length > 0) {
        return {
          ...folder,
          children: addChildToFolder(folder.children, parentId, newChild),
        };
      } else {
        return folder;
      }
    });
  };

  const renderFolders = (folders, level = 0) => {
    return (
      <ul>
        {folders.map((folder) => (
          <li
            key={folder.id}
            style={{ marginLeft: `${level * 20}px`, listStyle: "none" }}
          >
            <Tree content={folder?.name} >
             
              <div>
                {folder.children &&
                  folder.children.length > 0 &&
                  renderFolders(folder.children, level + 1)}
              </div>
            </Tree>
          </li>
        ))}
      </ul>
    );
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
        <Box sx={{ overflow: "auto" }}>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>Create New..</span>
            <IconButton
              color="primary"
              sx={{
                fontSize: 20,
                marginLeft: 4,
              }}
              onClick={() => addFolder()}
            >
              <MdCreateNewFolder />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => handleAddFile()}
              sx={{ fontSize: 20 }}
            >
              <FiFilePlus />
            </IconButton>
            <IconButton color="primary" sx={{ fontSize: 15 }}>
              {<LuMinimize />}
            </IconButton>
          </div>

          <List>
            {/* {list
              ? list?.map((item, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    onMouseEnter={() => setVisibleIcons(true)}
                    onMouseLeave={() => setVisibleIcons(false)}
                    selected={selectedItem === index}
                    onClick={() => handleItemClick(index)}
                    sx={{
                      backgroundColor:
                        selectedItem === index ? "#2196F3" : "transparent",
                    }}
                  >
                    {item?.folder ? (
                      <div>
                        <IconButton
                          sx={{ fontSize: 15 }}
                          onClick={() => toggleItemExpansion(index)}
                        >
                          {expandedItems.includes(index) ? (
                            <IoIosArrowDown />
                          ) : (
                            <IoIosArrowForward />
                          )}
                        </IconButton>
                        <IconButton sx={{ fontSize: 15 }}>
                          {expandedItems.includes(index) ? (
                            <AiFillFolderOpen />
                          ) : (
                            <FaFolder />
                          )}
                        </IconButton>
                      </div>
                    ) : (
                      <div>
                        <IconButton
                          sx={{ fontSize: 15 }}
                          onClick={() => toggleItemExpansion(index)}
                        >
                          <IoIosArrowForward />
                        </IconButton>
                        <IconButton sx={{ fontSize: 15 }}>
                          <FaFile />
                        </IconButton>
                      </div>
                    )}
                    {editingIndex === index ? (
                      <input
                        style={{ width: "80px" }}
                        type="text"
                        value={editValue}
                        onChange={handleEditChange}
                        onBlur={() => handleEditBlurOrEnter(index)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleEditBlurOrEnter(index);
                        }}
                      />
                    ) : (
                      <>
                        {item.folder ? (
                          <ListItemText
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                            onDoubleClick={() => handleDoubleClick(index)}
                            primary={item.folder}
                          />
                        ) : (
                          <ListItemText
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                            onDoubleClick={() => handleDoubleClick(index)}
                            primary={item.file}
                          />
                        )}
                      </>
                    )}
                    {visibleIcons && (
                      <div>
                        <IconButton
                          color="error"
                          sx={{
                            fontSize: 15,
                          }}
                          onClick={() => handleDelete(index)}
                        >
                          <MdDelete />
                        </IconButton>
                      </div>
                    )}
                  </ListItem>
                ))
              : null} */}

            {renderFolders(folders)}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <div>
          <EditorScreen editorData={exampleData} />
        </div>
      </Box>
    </Box>
  );
}
