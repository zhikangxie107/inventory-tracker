'use client'

import { Box } from "@mui/material";
import EnhancedTableToolbar from "./enhancedTableToolBar";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  [key: string]: any;
}

interface InventoryListProps {
    items: InventoryItem[]
}

const InventoryGrid: React.FC<InventoryListProps> = ({ items }) => {
    return (
      <Box className="border rounded">
        <EnhancedTableToolbar numSelected={0} />
      </Box>
    )
  
};

export default InventoryGrid;
