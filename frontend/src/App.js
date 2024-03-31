import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { createContext, useState } from "react"; 
export const ApplicationContext = createContext();

//===============================================================

const App = () => { 

  return (
    <ApplicationContext.Provider
      value={{
        
      }}
    > 
        <Routes>
          
         
         
           
        </Routes>
     
    </ApplicationContext.Provider>
  );
};

export default App;
