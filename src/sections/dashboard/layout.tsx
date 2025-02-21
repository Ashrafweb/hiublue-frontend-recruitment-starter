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
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

const navItems = [
  { text: "Dashboard", icon: "/dashboard_icon.svg", path: "/" },
  { text: "Onboarding", icon: "/onboarding_icon.svg", path: "/onboarding" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { logout } = useAuth();
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
          {isMobile && (
            <IconButton
              color='inherit'
              aria-label='Toggle navigation menu'
              edge='start'
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
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

          <IconButton
            color='inherit'
            aria-label='User menu'
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ border: "1px solid #5BE49B", p: 0.5 }}
          >
            <Avatar src='/Img_Avatar.svg' alt='User Avatar' />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            PaperProps={{ sx: { width: "120px" } }}
          >
            <MenuItem sx={{ textAlign: "center" }} onClick={() => logout()}>
              Logout
            </MenuItem>
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
              href={path}
              key={index}
              disablePadding
              component='a'
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

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: isMobile ? 0 : 3,
          mt: { xs: 8, md: 8 },
          width: {
            xs: "100%",
            sm: `calc(100% - ${COLLAPSED_WIDTH}px)`,
            md: `calc(100% - ${
              isDrawerOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH
            }px)`,
            lg: `calc(100% - ${
              isDrawerOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH
            }px)`,
            xl: `calc(100% - ${
              isDrawerOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH
            }px)`,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
