/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "../Main/index.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
export const Main = () => {
  const [allBranch, setAllBranch] = useState([]);
  const [menu, setmenu] = useState([]);

  const openPickerButtonStyle = {
    fontSize: "12px",
    width: "20px",
  };

  useEffect(() => {
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

  const handleDelete = (id) => {
    console.log("Deleting row with ID:", id);
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
      width: 150,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "street_name",
      headerName: "Street",
      width: 150,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 200,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "end_time",
      headerName: "End Time",
      width: 200,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "nearby_landmarks",
      headerName: "Landmarks",
      width: 150,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "add",
      headerName: "Add Menu Item",
      width: 120,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <IconButton
          aria-label="Add"
          style={{ width: "10px", color: "blue" }}
           
        >
          <MoreVertIcon />
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
          onClick={() => handleDelete(params.row.restaurant_id)}
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
            slotProps={{ baseIconButton: { style: openPickerButtonStyle } }}
            rows={allBranch}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};
