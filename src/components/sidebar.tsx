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
  IconButton,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth: number = 240;
import { auth } from "@/backend/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

interface User {
  name: string | null;
  email: string | null;
}
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

  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  // get user data
  const [name, setName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");

  const getUser = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const data: User = {
          name: user.displayName,
          email: user.email,
        };

        setName(data.name);
        setEmail(data.email);
      }
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  };

  useEffect(getUser, []);

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
              <Link href={item.path} key={item.text}>
                <ListItem>
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
                  <p className="font-bold text-xs">{name}</p>
                  <p className="text-[10px]">{email}</p>
                </Box>
              </Box>
              <Box>
                <IconButton onClick={logout}>
                  <LogoutIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideBar;
