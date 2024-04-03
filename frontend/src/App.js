import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { createContext } from "react"; 
import AdminDashboard from "./components/Admin/AdminDashboard";
export const ApplicationContext = createContext();

//===============================================================

const App = () => { 

  return (
    <ApplicationContext.Provider
      value={{
        
      }}
    > 
        <Routes>
          
         
        <Route path="/Admin" element={<AdminDashboard/>} />
           
        </Routes>
     
    </ApplicationContext.Provider>
  );
};

export default App;
