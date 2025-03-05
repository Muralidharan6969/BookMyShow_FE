import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";

const ProfileMenu = ({
  handleLogout,
  handleProfileClick,
  userName,
  userAvatar,
  handleOrderClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        padding: "5px 10px",
        borderRadius: "8px",
        "&:hover": { cursor: "pointer" },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar src={userAvatar} sx={{ width: 32, height: 32 }} />
      <Typography variant="body1">Hi, {userName || "User"}</Typography>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMouseLeave}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: "10px",
            minWidth: "160px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            transition: "ease-in-out",
          },
        }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Avatar src={userAvatar} sx={{ width: 32, height: 32, mr: 1 }} />
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOrderClick}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          Booking History
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
