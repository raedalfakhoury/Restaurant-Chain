/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "../Main/index.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CustomizedSnackbars from "../../../snackBar/Snackbar";
import { WpfMaintenance } from "../../../Icon/Icon";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
export const Main = () => {
  const [allBranch, setAllBranch] = useState([]);
  const [menu, setmenu] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [SnackBarText, setSnackBarText] = useState("");
  const [SnackBarStatus, setSnackBarStatus] = useState("");
  const [resMenuId, setResMenuId] = useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickSnack = () => {
    setOpenSnackBar(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const ITEM_HEIGHT = 48;

  const getAllBranch = () => {
    axios
      .get("http://localhost:5000/restaurant/")
      .then((result) => {
        const rowsWithId = result.data.result.map((row) => ({
          id: row.restaurant_id,
          ...row,
        }));
        setAllBranch(rowsWithId);
        // console.log(rowsWithId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBranch();
    axios
      .get("http://localhost:5000/restaurant/allmenu")
      .then((result) => {
        setmenu(result.data.result);
        // console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteBranch = (restaurant_id) => {
    axios
      .put(`http://localhost:5000/restaurant/restaurantBranch/delete/${ restaurant_id}`)
      .then((result) => {
        if (result.data.message === "restaurant deleted successfully") {
          setSnackBarText("restaurant deleted successfully");
          setSnackBarStatus("success");
        }
        getAllBranch();
        handleClickSnack()
      })
      .catch((err) => {
        console.log(err);
        setSnackBarText("Server Error");
        setSnackBarStatus("error");
      });
  };

  const columns = [
    {
      field: "restaurant_name",
      headerName: "Restaurant Name",
      width: 150,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 110,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "street_name",
      headerName: "Street",
      width: 200,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "end_time",
      headerName: "End Time",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "nearby_landmarks",
      headerName: "Landmarks",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "add",
      headerName: "Add Menu Item",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <IconButton
          aria-label="Add"
          style={{ width: "50px", color: "blue" }}
          
          onClick={(event) => {
            handleClick(event);
            setResMenuId((prev) => {
              return {
                ...prev,
                restaurant_id: params.row.restaurant_id,
              };
            });
            
          }}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
    {
      field: "add Maintenance",
      headerName: "maintenance",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <IconButton
          aria-label="Add"
          style={{ width: "50px", color: "blue" }}
           
        >
          <SettingsSuggestIcon />
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: "Delete",
      width: 120,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleDeleteBranch(params.row.restaurant_id);
            getAllBranch();
            console.log(params.row.restaurant_id);
          }}
          aria-label="delete"
          style={{ width: "10px", color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <div style={{ width: "100%", marginTop: "80px", marginLeft: "2px" }}>
        <Box sx={{ mb: 1 }}></Box>
        <div style={{ height: 600 }}>
          <DataGrid
            slotProps={{
              baseIconButton: { style: { fontSize: "12px", width: "20px" } },
            }}
            rows={allBranch}
            columns={columns}
          />
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {menu?.map((option) => (
                <MenuItem
                  style={{}}
                  key={option.menu_id}
                  onClick={() => {
                    setResMenuId((prev) => {
                      return {
                        ...prev,
                        menu_id: option.menu_id,
                      };
                    });

                    handleClose();
                    axios
                      .post(`http://localhost:5000/restaurant/menu`, resMenuId)
                      .then((result) => {
                        handleClickSnack();
                        if (result.data.message === "Added Successfully") {
                          setSnackBarText("added successfully");
                          setSnackBarStatus("success");
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        setSnackBarText("failed to add item");
                        setSnackBarStatus("error");
                      });
                  }}
                >
                  {option.item}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </div>
      <CustomizedSnackbars
        open={openSnackBar}
        handleClick={handleClickSnack}
        setOpen={setOpenSnackBar}
        text={SnackBarText}
        status={SnackBarStatus}
      />
    </>
  );
};
