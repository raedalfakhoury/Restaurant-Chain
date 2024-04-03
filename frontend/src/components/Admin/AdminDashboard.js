/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../Admin/AdminDashboard.css"
import axios from "axios";
import Swal from "sweetalert2";
  
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
 
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import UpdateIcon from '@mui/icons-material/Update'; 
import { PhGitBranch, PhSquaresFour } from "../Icon/Icon";
const drawerWidth = 240;
 

 




const AdminDashboard = () => { 
  const [addProduct, setAddProduct] = useState(false); 
  const [allOrders, setAllOrders] = useState(false); 
  const [toggleOrder, setToggleOrder] = useState(false); 
  const [productDetail, setProductDetail] = useState({}); 
 
  const icons = [
    // <ProductionQuantityLimitsIcon />,
     <PhGitBranch />,
    <PhSquaresFour />,
  
  ];
  const handleButtonClick = (index) => {
     switch (index) {
      case 0: 
        setAddProduct(!addProduct); 
        setToggleOrder(false);
        break;
      case 1: 
         setToggleOrder(!toggleOrder);
         setAddProduct(false); 
     
        break;
      
      default:
        break;
    }
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
      
        sx={{ width: '100%' ,zIndex:"1"}}
      >
        <Toolbar >
          <Typography variant="h6" noWrap component="div" sx={{flexGrow:1 , textAlign:"center"}}>
           AdminDashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          zIndex:"0",
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Add a branch', 'Add an item'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleButtonClick(index)}>
                <ListItemIcon>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph sx={{ flexGrow: 1,width:"100%" ,display:"flex",justifyContent:"center"}}>
        <div class="card-container">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="container">
        <div class="log-card">
    <div className="center"><p class="heading">Add New Branch</p> </div>

    <div class="input-group">
        <p class="text">Restaurant Name</p>
        <input class="input" type="username"  />
        <p class="text">Phone</p>
        <input class="input" type="tel" />
        <p class="text">Street Name</p>
        <input class="input" type="text"/>
        <p class="text">Start Time</p>
        <input class="input" type="text"/>
        <p class="text">End Time</p>
        <input class="input" type="text"/>
        <p class="text">Nearby Landmarks</p>
        <input class="input" type="text"/>
    </div>

    

    <div className="create"><button class="btn">Create</button> </div>
</div>
    </div>
</div>

 
  
        </Typography>
       
      </Box>
    </Box>
  );
};

export default AdminDashboard;
 

 
 