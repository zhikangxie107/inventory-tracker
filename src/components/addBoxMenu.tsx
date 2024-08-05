import {
  Box,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
const AddBoxMenu = () => {
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
          />
          <TextField
            required
            label="Category"
            size="small"
            color="primary"
            className="w-80"
          />
          <TextField
            required
            label="Quantity"
            size="small"
            color="primary"
            className="w-80"
            type="number"
          />
          <TextField
            required
            label="Price"
            size="small"
            color="primary"
            className="w-80"
            InputProps={{
              startAdornment: <AttachMoneyIcon fontSize="small" />,
            }}
            type="number"
          />
        </Box>

        <Box className="flex justify-end pb-5">
          <IconButton color="primary" size="large">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBoxMenu;
