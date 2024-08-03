"use client";
import {
  Typography,
  Box,
  Drawer,
  Toolbar,
  Divider,
  AppBar,
  CssBaseline,
} from "@mui/material";

export default function Home() {
  return (
    <Box className="flex">
      <CssBaseline />
      <AppBar
        position="fixed"
        className="bg-blue-500 flex"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            className="text-white"
            variant="h6"
            noWrap
            component="div"
          >
            Inventory Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
      </Drawer>
    </Box>
  );
}
