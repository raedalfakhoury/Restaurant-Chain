/* eslint-disable no-unused-vars */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Box from "@mui/material/Box";
export const Main = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 5,
  });
  const openPickerButtonStyle = {
    fontSize: "12px",
    width: "20px",
  };
  return (
    <div style={{ width: "100%", marginTop: "80px" }}>
      <Box sx={{ mb: 1 }}></Box>
      <div style={{ height: 400}}>
        <DataGrid
          slotProps={{ baseIconButton: { style: openPickerButtonStyle } }}
          {...data}
        />
      </div>
    </div>
  );
};
