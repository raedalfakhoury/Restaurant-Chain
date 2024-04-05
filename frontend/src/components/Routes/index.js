import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../page/Admin/AdminDashboard";
import { Main } from "../page/Admin/Main";
import AddBranch from "../page/Admin/AddBranch";
import Menu from "../page/Admin/Menu/Menu";




export const routers = createBrowserRouter([
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
          path: "add-menu",
          element: <Menu/>,
        },
   
    
       
      ],
    },
  ]);
  
  
