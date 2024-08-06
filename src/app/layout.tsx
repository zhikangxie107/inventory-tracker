
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "../components/sidebar";
import { Box } from "@mui/material";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Home',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Box className="">
          {children}
        </Box>
      </body>
    </html>
  );
}
