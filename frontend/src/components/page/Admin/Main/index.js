import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export const Main = () => {
  const [allBranch, setAllBranch] = useState([]);

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
        console.log(rowsWithId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log("Deleting row with ID:", id);
  };

  const columns = [
    { field: "restaurant_name", headerName: "Restaurant Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "street_name", headerName: "Street", width: 150 },
    { field: "start_time", headerName: "Start Time", width: 200 },
    { field: "end_time", headerName: "End Time", width: 200 },
    { field: "nearby_landmarks", headerName: "Landmarks", width: 150 },
    {
      field: "actions",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDelete(params.row.id)}
          aria-label="delete"
          style={{ width: "10px", color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
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
  );
};
