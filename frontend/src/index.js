/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  
import { LicenseInfo } from '@mui/x-license';

LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   
      <App />
 
  </React.StrictMode>
);
