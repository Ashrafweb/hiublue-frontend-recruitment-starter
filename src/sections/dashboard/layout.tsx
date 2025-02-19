"use client";

import * as React from "react";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SpeedIcon from "@mui/icons-material/Speed";
import Image from "next/image";
const drawerWidth = 240; // Full width
const collapsedWidth = 70; // Collapsed width

const navItems = [
  { text: "Dashboard", icon: <SpeedIcon />, path: "/" },
  { text: "Onboarding", icon: <ShoppingBagIcon />, path: "/onboarding" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar */}
      <AppBar
        position='fixed'
        color='default'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {/* <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant='h6' component='a' href='/' sx={{ flexGrow: 1 }}>
            <Image
              src='/hiublue.png'
              width={30}
              height={30}
              alt='hiublue-logo'
            />
          </Typography>
          {/* Profile Avatar */}
          <IconButton
            color='inherit'
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar alt='User Avatar' />
          </IconButton>
          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant='permanent'
        open={isDrawerOpen}
        sx={{
          width: isDrawerOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? drawerWidth : collapsedWidth,
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem>
            <Typography
              style={{
                fontSize: "14px",
              }}
              variant='h6'
              fontWeight={600}
              color='#989898'
            >
              OVERVIEW
            </Typography>
          </ListItem>
          {navItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              component='a'
              style={{ color: "black" }}
              href={item.path}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {isDrawerOpen && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
