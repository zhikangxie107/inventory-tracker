"use client";
import SideBar from "@/components/sidebar";
import { SelectedProvider } from "@/context/selectedContext";
import { Box } from "@mui/material";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <Box className="flex">
        <SideBar />
        <SelectedProvider>{children}</SelectedProvider>
      </Box>
    </section>
  );
}
