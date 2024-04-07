/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import axios from "axios";
import "../Main/index.css";
import { ApplicationContext } from "../../../../App";
export const Details = () => {
  const { token } = useContext(ApplicationContext);
  const [allBranch, setAllBranch] = useState([]);

  const getAllBranch = () => {
    axios
      .get("https://restaurant-chain.onrender.com/restaurant//maintenance_res/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        const rowsWithId = result.data.result.map((row) => ({
          id: row.restaurant_id,
          ...row,
        }));
        setAllBranch(rowsWithId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBranch();
  }, []);

  const columns = [
    {
      field: "restaurant_name",
      headerName: "Restaurant Name",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 90,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "street_name",
      headerName: "Street",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "start_maintenance_date",
      headerName: "Start Time",
      width: 110,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "end_maintenance_date",
      headerName: "End Time",
      width: 110,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "labour_number",
      headerName: "Labour Number",
      width: 90,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "labor_rate_per_day",
      headerName: "Labor Rate Per Day (JD)",
      width: 90,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "material_cost",
      headerName: "Material Cost (JD)",
      width: 150,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 90,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "impact",
      headerName: "Impact On Restaurant",
      width: 150,
      headerClassName: "custom-header",
      cellClassName: (params) =>
        params.value === "Complete shutdown"
          ? "normal-operations-cell"
          : "custom-cell",
    },

    {
      field: "maintenance_duration",
      headerName: "Duration (DAY)",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "cost",
      headerName: "cost (JD)",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
  ];

  return (
    <>
      <div style={{ width: "100%", marginTop: "80px", marginLeft: "2px" }}>
        <Box sx={{ mb: 1 }}></Box>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            slotProps={{
              baseIconButton: { style: { fontSize: "12px", width: "20px" } },
            }}
            autoHeight
            disableVirtualization
            rows={allBranch}
            columns={columns}
          />
          <div></div>
        </div>
      </div>
    </>
  );
};
