"use client";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InventoryList from "@/components/inventoryList";
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestore } from "@/backend/firebase";
import InventoryGrid from "@/components/inventoryGrid";
import AddBoxMenu from "@/components/addBoxMenu";

export const useAddBoxModalState = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("Closing modal");
    setOpen(false);
  };

  return {
    open,
    setOpen,
    handleOpen,
    handleClose,
  };
};

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

  //handles modal functions
  const { open, handleOpen, handleClose } = useAddBoxModalState();

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
          id: doc.id,
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
          <ToggleButton value="grid" color="primary" disabled>
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
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Box
        </Button>
      </Box>

      {/* Add Box Menu */}
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <AddBoxMenu />
      </Modal>

      {/* Inventory view */}
      <Box className="p-4">
        {view == "list" ? (
          <InventoryList items={items} />
        ) : (
          <InventoryGrid items={items} />
        )}
      </Box>
    </Box>
  );
};

export default Inventory;
