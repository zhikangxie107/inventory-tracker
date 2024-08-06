import { Box, Button, Typography } from "@mui/material";

const LandingPage = () => {
  return (
    // Landing page
    <Box className="relative min-h-screen bg-gray-100">
      {/* sign up and login */}
      <Box className="absolute top-0 right-0 p-4 flex gap-4">
        <Button variant="outlined">Sign Up</Button>
        <Button variant="contained">Log In</Button>
      </Box>

      <Box className="flex items-center justify-center min-h-screen">
        <p className="text-9xl">Storage Box</p>
      </Box>
    </Box>
  );
};

export default LandingPage;
