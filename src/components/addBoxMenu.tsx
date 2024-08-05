"use client";
import { Box, Divider, TextField, IconButton } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { firestore } from "@/backend/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAddBoxModalState } from "@/app/dashboard/inventory/page";

const AddBoxMenu = () => {
  const [name, setName] = useState<String>("");
  const [category, setCategory] = useState<String>("");
  const [quantity, setQuantity] = useState<Number>(0);
  const [price, setPrice] = useState<Number>(0);

  const { handleClose } = useAddBoxModalState();
  // add item to database

  const addItem = async () => {
    if (name != "" && category != "") {
      // get collection
      const reference = collection(firestore, "inventory");

      await addDoc(reference, {
        name: name,
        category: category,
        quantity: quantity,
        price: price,
      });

      setName("");
      setCategory("");
      setQuantity(0);
      setPrice(0);
    }
  };
  return (
    <Box className="p-5 w-1/2 h-1/2 max-w-lg  bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg ">
      <p className="font-semibold text-3xl ">Add Item</p>
      <Divider />
      <Box className="py-4 flex flex-col justify-between h-full">
        <Box className="flex flex-col gap-4 ">
          <TextField
            required
            label="Name"
            size="small"
            color="primary"
            className="w-80"
            value={name}
            onChange={(event: any) => setName(event.target.value)}
          />
          <TextField
            required
            label="Category"
            size="small"
            color="primary"
            className="w-80"
            value={category}
            onChange={(event: any) => setCategory(event.target.value)}
          />
          <TextField
            required
            label="Quantity"
            size="small"
            color="primary"
            className="w-80"
            type="number"
            value={quantity}
            onChange={(event: any) => setQuantity(event.target.value)}
          />
          <TextField
            required
            label="Price $"
            size="small"
            color="primary"
            className="w-80"
            type="number"
            value={price}
            onChange={(event: any) => setPrice(event.target.value)}
          />
        </Box>

        <Box className="flex justify-end pb-5">
          <IconButton
            color="primary"
            size="large"
            onClick={() => {
              addItem();
              handleClose();
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBoxMenu;
