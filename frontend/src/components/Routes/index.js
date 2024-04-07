import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../page/Admin/AdminDashboard";
import { Main } from "../page/Admin/Main";
import AddBranch from "../page/Admin/AddBranch";
import Menu from "../page/Admin/Menu/Menu";
import { Details } from "../page/Admin/Details/Details";
import Login from "../Login/Login";
import Home from "../Home/Home";
import About from "../About/About";




export const routers = createBrowserRouter([
  
  {
    path: "/",
    element: <Home/>,
    
  },
  {
    path: "login",
    element: <Login/>,
     
  },
  {
    path: "about",
    element: <About/>,
     
  },
    {
      path: "admin",
      element: <AdminDashboard/>,
      children: [
        {
          path: "main",
          element: <Main/>,
        },
        {
          path: "add-branch",
          element: <AddBranch/>,
        },
        {
          path: "details",
          element: <Details/>,
        },
        {
          path: "add-menu",
          element: <Menu/>,
        },
   
    
       
      ],
    },
   
  ]);
  
  
