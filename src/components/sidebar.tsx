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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth: number = 240;

const SideBar = () => {
  const sideBarItems: Array<{ text: string; icon: JSX.Element; path: string }> =
    [
      {
        text: "Inventory",
        icon: <InventoryIcon />,
        path: "/dashboard/inventory",
      },
    ];

  const pathname = usePathname();

  

  return (
    <Box>
      <CssBaseline />
      <Drawer
        className=""
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

        <Box className="flex flex-col flex-grow">
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

          {/* Profile section */}
          <Box className="py-4  mt-auto">
            <Divider />
            <Box className="flex p-4 justify-between">
              <Box className="flex items-center">
                <AccountCircleIcon fontSize="large" />
                <Box className="pl-2">
                  <p className="font-bold text-xs">Zhi Kang Xie</p>
                  <p className="text-xs">email</p>
                </Box>
              </Box>
              <Box>
                <LogoutIcon/>
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideBar;
