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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image, { StaticImageData } from "next/image";
import MenuIcon from "@mui/icons-material/Menu";

// Assets
import avatarUrl from "public/Img_Avatar.svg";
import dashboardIcon from "public/dashboard_icon.svg";
import onboardingIcon from "public/onboarding_icon.svg";

// Constants
const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 70;

const navItems = [
  { text: "Dashboard", icon: dashboardIcon, path: "/" },
  { text: "Onboarding", icon: onboardingIcon, path: "/onboarding" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar */}
      <AppBar
        position='fixed'
        color='default'
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Toggle navigation menu'
            edge='start'
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h6'
            component='a'
            href='/'
            sx={{ flexGrow: 1, textDecoration: "none" }}
          >
            <Image
              src='/hiublue.png'
              width={30}
              height={30}
              alt='HIU Logo'
              priority
            />
          </Typography>

          {/* Profile Avatar */}
          <IconButton
            color='inherit'
            aria-label='User menu'
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ border: "1px solid #5BE49B", p: 0.5 }}
          >
            <Avatar
              src={(avatarUrl as StaticImageData).src}
              alt='User Avatar'
            />
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            PaperProps={{ sx: { width: "120px" } }}
          >
            <MenuItem sx={{ textAlign: "center" }}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          width: isDrawerOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Divider />

        <List>
          <ListItem sx={{ display: isDrawerOpen ? "block" : "none", px: 2 }}>
            <Typography
              variant='subtitle2'
              fontWeight={600}
              color='textSecondary'
            >
              OVERVIEW
            </Typography>
          </ListItem>

          {navItems.map(({ text, icon, path }, index) => (
            <ListItem
              key={index}
              disablePadding
              component='a'
              href={path}
              style={{ color: "#000" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Image
                    src={icon}
                    alt={`${text} icon`}
                    width={30}
                    height={30}
                    priority
                  />
                </ListItemIcon>
                {isDrawerOpen && <ListItemText primary={text} />}
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
