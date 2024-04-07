import "./App.css";
import { RouterProvider } from "react-router-dom";
import React, { createContext, useState } from "react";
import { routers } from "./components/Routes";
export const ApplicationContext = createContext();

//===============================================================

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  return (
    <ApplicationContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      <RouterProvider router={routers} />
      ;\
    </ApplicationContext.Provider>
  );
};

export default App;
