import "./App.css";
import { Routes, Route, Outlet, RouterProvider } from "react-router-dom";
import React, { createContext } from "react"; 
import AdminDashboard from "./components/page/Admin/AdminDashboard";
import { Main } from "./components/page/Admin/Main";
import {  routers } from "./components/Routes";
export const ApplicationContext = createContext();

//===============================================================

const App = () => { 

  return   <RouterProvider router={routers} />;
};

export default App;
