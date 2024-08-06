"use client";
import { Box, Button, Divider, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { useState } from "react";
import {
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/backend/firebase";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setError] = useState<boolean>(false);

  const login = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Box className="p-5 w-1/2 h-1/2 max-w-lg  bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg ">
        <Box className="flex items-center justify-center">
          <p className="font-semibold text-3xl pb-2">Login</p>
        </Box>
        <Divider />
        <Box className="py-4 flex flex-col justify-between h-full">
          {/* sign up with google button */}
          <Box className="flex items-center justify-center">
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              className="text-black border-black"
            >
              Continue with Google
            </Button>
          </Box>

          <Divider className="py-4">or with</Divider>

          {/* Text Forms */}
          <Box className="flex flex-col gap-5 pb-4">
            <TextField
              label="email"
              size="small"
              fullWidth
              required
              value={email}
              onChange={(event: any) => setEmail(event.target.value)}
              error={errorMessage}
              helperText={errorMessage ? "Error Logging in" : ""}
            />
            <TextField
              label="password"
              size="small"
              fullWidth
              required
              value={password}
              onChange={(event: any) => setPassword(event.target.value)}
            />
          </Box>

          {/* Submit Button */}
          <Box className="flex justify-center items-center">
            <Button variant="outlined" onClick={login}>Login</Button>
          </Box>
        </Box>

        {/* Don't have an account? Sign Up */}
        <Box className="pt-4 flex items-center justify-center">
          <Link href="/signup">
            <Button className="text-black" size="small">
              Don't have an account? Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
