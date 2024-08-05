"use client";
import {
  Box,
  Drawer,
  Divider,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth: number = 240;

const SideBar = () => {
  const sideBarItems: Array<{ text: string; icon: JSX.Element; path: string }> =
    [{ text: "Inventory", icon: <InventoryIcon />, path: "/dashboard/inventory" }];

  const pathname = usePathname();

  return (
    <Box>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#F8F7FA",
          },
        }}
      >
        {/* Project name */}
        <Box className="flex pl-4 py-4 items-center">
          <DashboardIcon color="primary" />
          <p className="font-semibold text-3xl pl-2">StorageBox</p>
        </Box>
        <Divider />
        {/* List for Side Icons Bar */}
        <List>
          {sideBarItems.map((item) => (
            <Link href={item.path}>
              <ListItem key={item.text}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
