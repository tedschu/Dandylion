import { useNavigate } from "react-router-dom";
import { UserInfo } from "../types/types";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // window.location.reload();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <div></div>
        <h1 onClick={() => navigate("/")} style={{ color: "white" }}>
          dandylion.ai
        </h1>
        <div className="navMenu">
          <IconButton
            id="hamburger-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem style={{ fontWeight: "bold" }}>
              Hey, {userInfo.email}
            </MenuItem>
            <MenuItem onClick={() => navigate("/me")}>My plans</MenuItem>
            <MenuItem onClick={() => navigate("/path")}>Start a plan</MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default Header;
