import "./App.css";
import { RouterProvider } from "react-router-dom";
import React, { createContext } from "react";
import { routers } from "./components/Routes";
export const ApplicationContext = createContext();

//===============================================================

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
