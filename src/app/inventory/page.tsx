"use client";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InventoryList from "@/components/inventoryList";
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestore } from "@/backend/firebase";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  [key: string]: any;
}
const Inventory = () => {
  // state for switching between grid / list
  const [view, setView] = useState<string | null>("list");

  // func to handle the view
  const handleView = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const [findField, setFindField] = useState<string>("");

  const handleFindChange = (event: any) => {
    setFindField(event.target.value);
  };

  const [items, setItems] = useState<InventoryItem[]>([]);

  // read items from database
  useEffect(() => {
    const q = query(collection(firestore, "inventory"));
    const snapshot = onSnapshot(q, (querySnapshot) => {
      let itemsArry: InventoryItem[] = [];

      querySnapshot.forEach((doc) => {
        // Assert that doc.data() is of type InventoryItem
        const data = doc.data() as InventoryItem;

        // Create an item object including the document ID
        const item: InventoryItem = {
          ...data,
        };

        itemsArry.push(item);
      });
      setItems(itemsArry);
    });
    return () => snapshot();
  }, []);

  return (
    // Toggle Icon for grid / list view
    <Box className="w-full h-full">
      <Box className="p-4 flex justify-end">
        <ToggleButtonGroup
          className=""
          exclusive
          value={view}
          onChange={handleView}
          size="small"
        >
          <ToggleButton value="list" color="primary">
            <ListIcon />
          </ToggleButton>
          <ToggleButton value="grid" color="primary">
            <GridViewIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Search Box and Add Box Button */}
      <Box className="flex p-4 justify-between">
        <TextField
          id="filled-basic"
          label="Find"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          color="primary"
          value={findField}
          onChange={handleFindChange}
          className="min-w-80"
        />
        <Button variant="contained" size="small" startIcon={<AddIcon />}>
          Add Box
        </Button>
      </Box>

      {/* Inventory view */}
      <Box className="p-4">
        <InventoryList items={items} />
      </Box>
    </Box>
  );
};

export default Inventory;
