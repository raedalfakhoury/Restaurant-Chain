import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../page/Admin/AdminDashboard";
import { Main } from "../page/Admin/Main";
import AddBranch from "../page/Admin/AddBranch";
import Menu from "../page/Admin/Menu/Menu";
import { Details } from "../page/Admin/Details/Details";
import Login from "../Login/Login";




export const routers = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
     
  },
    {
      path: "/",
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
  
  
