import SideBar from "@/components/sidebar";
import { Box } from "@mui/material";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Box className="flex">
        <SideBar />
        {children}
      </Box>
    </section>
  );
}
