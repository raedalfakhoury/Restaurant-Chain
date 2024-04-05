/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { PhGitBranch, PhSquaresFour } from "../../Icon/Icon";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const icons = [
    { title: "All Branch", icon: <RestaurantOutlinedIcon />, path: "main" },
    { title: "Add Branch", icon: <PhGitBranch />, path: "add-branch" },
    { title: "Add menu", icon: <PhSquaresFour />, path: "add-menu" },
  ];

  return (
    <>
      {" "}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ width: "100%", zIndex: "1" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              AdminDashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            zIndex: "0",
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {icons.map((item, index) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>

        <Outlet />
      </Box>
    </>
  );
};

export default AdminDashboard;
