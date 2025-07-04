// src/components/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 200 }}>
      <List>
        <ListItemButton component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
         <ListItemButton component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/products">
          <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton component={Link} to="/expenses">
          <ListItemText primary="Expenses" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
