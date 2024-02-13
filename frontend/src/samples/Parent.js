import React, { useState } from "react";
import { gridTemplates } from "./Data/gridTemplates";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Button, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import { useNavigate } from "react-router-dom";
const Parent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [layouts, setLayouts] = useState([]);
  const [layoutCounts, setLayoutCounts] = useState({});

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLayoutSelect = (item) => {
    setAnchorEl(null);
    navigate(`${item.path}`);

    // const newLayouts = [...layouts];
    // const newLayoutCounts = { ...layoutCounts };

    // if (!newLayoutCounts[layout]) {
    //   newLayoutCounts[layout] = 1;
    // } else {
    //   newLayoutCounts[layout]++;
    // }

    // setLayoutCounts(newLayoutCounts);

    // let newLayout;
    // if (layout === "Two-sided") {
    //   newLayout = <Layout2 count={newLayoutCounts[layout]} />;
    // } else if (layout === "Three sided") {
    //   newLayout = <Layout3 count={newLayoutCounts[layout]} />;
    // } else if (layout === "Custom") {
    //   newLayout = <CustomLayout count={newLayoutCounts[layout]} />;
    // }

    // newLayouts.push(newLayout);
    // setLayouts(newLayouts);
  };

  return (
    <div className="w-full ">
      <div className="flex justify-end w-full mr-2 sticky top-0 shadow-md z-10 p-5 ">
        <Tooltip title="Layouts">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              color: "black",
            }}
            aria-controls={anchorEl ? "account-menu" : undefined}
            aria-haspopup="true"
          >
            <SpaceDashboardIcon />
          </IconButton>
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
      <div className="w-[100%] z-0 flex flex-col justify-between">
        {layouts.map((layout, index) => (
          <div key={index}>{layout}</div>
        ))}
      </div>
    </div>
  );
};

export default Parent;
