import React, { useState } from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useNavigate } from "react-router-dom";
import { gridTemplates } from "./Data/gridTemplates";

const Parent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editorData, setEditorData] = useState({
    time: Date.now(),
    blocks: [],
  });
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLayoutSelect = (item) => {
    setAnchorEl(null);
    navigate(`${item.path}`);
  };
  const initialContent = localStorage.getItem("editor");
  const editor = useBlockNote({
    initialContent: initialContent
      ? JSON.parse(initialContent)?.blocks
      : [],
    onEditorContentChange: (editor) => {
      setEditorData({ time: Date.now(), blocks: editor.topLevelBlocks });
      localStorage.setItem(
        "editor",
        JSON.stringify({ time: Date.now(), blocks: editor.topLevelBlocks })
      );
    },
    onEditorReady: (editor) => {
      editor.domElement?.focus();
    },
  });

  return (
    <div className="w-full relative">
      <div className="flex justify-end w-full mr-2 sticky top-0 shadow-md opacity-100 z-10 bg-white  p-5  ">
        <Tooltip title="Layouts">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              color: "black",
            }}
          >
            <SpaceDashboardIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 34,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {gridTemplates.map((item, index) => (
            <Tooltip title={item?.name} key={index}>
              <MenuItem onClick={() => handleLayoutSelect(item)}>
                <img
                  src={item.image}
                  alt=""
                  width={30}
                  height={30}
                  className={`${item.rotate ? "rotate-90" : "rotate-0"}`}
                />
              </MenuItem>
            </Tooltip>
          ))}
        </Menu>
      </div>
      <div className="p-5">
        <BlockNoteView editor={editor} theme={"light"} />
      </div>
    </div>
  );
};

export default Parent;
