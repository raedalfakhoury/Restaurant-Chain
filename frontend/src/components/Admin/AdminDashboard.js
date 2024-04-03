/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../Admin/AdminDashboard.css";
import axios from "axios";
import Swal from "sweetalert2";

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
import { PhGitBranch, PhSquaresFour } from "../Icon/Icon";
import CustomizedSnackbars from "../snackBar/Snackbar";
const drawerWidth = 240;

const AdminDashboard = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [SnackBarText, setSnackBarText] = useState("");
  const [SnackBarStatus, setSnackBarStatus] = useState("");
  const [addBranch, setAddBranch] = useState(false); 
  const [branchInfo, setBranchInfo] = useState({});
  const icons = [<PhGitBranch />, <PhSquaresFour />];

  const handleClick = () => {
    setOpenSnackBar(true);
  };
  const handleButtonClick = (index) => {
    switch (index) {
      case 0:
        setAddBranch(!addBranch); 
        break;
      case 1: 
        setAddBranch(false);

        break;

      default:
        break;
    }
  };

  return (
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
          {["Add a branch", "Add menu item"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleButtonClick(index)}>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography
          paragraph
          sx={{
            flexGrow: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {addBranch ? (
            <div className="card-container">
              <div className="circle1"></div>
              <div className="circle2"></div>
              <div className="container">
                <div className="log-card">
                  <div className="center">
                    <p className="heading">Add New Branch</p>{" "}
                  </div>

                  <form>
                    <div className="input-group">
                      <p className="text">Restaurant Name</p>
                      <input
                        required
                        className="input"
                        type="username"
                        onChange={(e) => {
                          setBranchInfo((prevObject) => {
                            return {
                              ...prevObject,
                              restaurant_Name: e.target.value,
                            };
                          });
                        }}
                      />
                      <p class="text">Phone</p>
                      <input
                        required
                        className="input"
                        type="tel"
                        onChange={(e) => {
                          setBranchInfo((prevObject) => {
                            return {
                              ...prevObject,
                              Phone: e.target.value,
                            };
                          });
                        }}
                      />
                      <p className="text">Street Name</p>
                      <input
                        required
                        className="input"
                        type="text"
                        onChange={(e) => {
                          setBranchInfo((prevObject) => {
                            return {
                              ...prevObject,
                              Street_name: e.target.value,
                            };
                          });
                        }}
                      />
                      <p className="text">Start Time</p>
                      <input
                        required
                        placeholder="EX: 8:00"
                        className="input"
                        type="text"
                        onChange={(e) => {
                          setBranchInfo((prevObject) => {
                            return {
                              ...prevObject,
                              start_time: e.target.value,
                            };
                          });
                        }}
                      />
                      <p className="text">End Time</p>
                      <input
                        required
                        placeholder="EX: 5:30"
                        className="input"
                        type="text"
                        onChange={(e) => {
                          setBranchInfo((prevObject) => {
                            return {
                              ...prevObject,
                              end_time: e.target.value,
                            };
                          });
                        }}
                      />
                      <p class="text">Nearby Landmarks</p>
                      <input
                        required
                        className="input"
                        type="text"
                        onChange={(e) => {
                          setBranchInfo((prevObject) => {
                            return {
                              ...prevObject,
                              nearby_landmarks: e.target.value,
                            };
                          });
                        }}
                      />

                      <div className="create">
                        <button
                          className="btn"
                          onClick={async (e) => {
                            setAddBranch(true)
                            handleClick();
                            axios
                              .post(
                                "http://localhost:5000/restaurant/add",
                                branchInfo
                              )
                              .then((result) => {
                                if (
                                  result.data.message ===
                                  "restaurant created successfully"
                                ) {
                                  setSnackBarText(result.data.message);
                                  setSnackBarStatus("success");
                                }
                              })
                              .catch((error) => {
                                console.log(error);
                                setSnackBarText("failed to create branch");
                                setSnackBarStatus("error");
                              });
                          }}
                        >
                          Create
                        </button>{" "}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
       
        </Typography>
        <CustomizedSnackbars
          open={openSnackBar}
          handleClick={handleClick}
          setOpen={setOpenSnackBar}
          status={SnackBarStatus}
          text={SnackBarText}
        />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
