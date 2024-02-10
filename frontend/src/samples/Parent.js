import React, { useState } from "react";
import Editor from "./Editor";
import { gridTemplates } from "./grids/gridTemplates";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Button, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { CustomLayout, Layout2, Layout3 } from "./Layout";

const Parent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [layouts, setLayouts] = useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLayoutSelect = (layout) => {
    setAnchorEl(null);

    if (layout === "Two-sided") {
      const newLayout = <Layout2 />;
      const newLayouts = [...layouts];
      newLayouts.push(newLayout);
      setLayouts(newLayouts);
    }

    if (layout === "Three sided") {
      const newLayout = <Layout3 />;
      const newLayouts = [...layouts];
      newLayouts.push(newLayout);
      setLayouts(newLayouts);
    }

    if (layout === "Custom") {
      const newLayout = <CustomLayout />;
      const newLayouts = [...layouts];
      newLayouts.push(newLayout);
      setLayouts(newLayouts);
    }
  };

  return (
    <div className="w-full ">
      <div className="flex justify-end w-full mr-2 sticky top-0 shadow-md z-10 bg-black p-5 ">
        <Tooltip title="Layouts">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              color: "white",
            }}
            aria-controls={anchorEl ? "account-menu" : undefined}
            aria-haspopup="true"
          >
            <SpaceDashboardIcon />
          </IconButton>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              ml: "15px",
            }}
          >
            Preview
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                // ml: -0.5,
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
            <Tooltip title={item?.name}>
              <MenuItem
                key={index}
                onClick={() => handleLayoutSelect(item.name)}
              >
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
      <div className="w-[100%] z-0 flex flex-col justify-between">
        <Editor />
        {layouts.map((layout, index) => (
          <div key={index}>
            {layout} <Editor />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parent;
