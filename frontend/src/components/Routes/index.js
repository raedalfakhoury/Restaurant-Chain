import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../page/Admin/AdminDashboard";
import { Main } from "../page/Admin/Main";
import AddBranch from "../page/Admin/AddBranch";
import Menu from "../page/Admin/Menu/Menu";
import { Details } from "../page/Admin/Details/Details";
import Login from "../Login/Login";
import Home from "../Home/Home";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Register from "../Register/Register";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        path: "main",
        element: <Main />,
      },
      {
        path: "add-branch",
        element: <AddBranch />,
      },
      {
        path: "details",
        element: <Details />,
      },
      {
        path: "add-menu",
        element: <Menu />,
      },
    ],
  },
]);
