"use client";
import { Box, Button, Divider, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

import { auth } from "@/backend/firebase";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [errorMessage, setError] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      router.push("/login");
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const checkLogin = () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push("/dashboard/inventory");
        }
      });

      // Clean up the subscription on component unmount
      return () => unsubscribe();
    };

    checkLogin();
  }, [router]); // Include router in the dependency array if necessary

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Box className="p-5 w-1/2 h-1/2 max-w-lg  bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg ">
        <Box className="flex items-center justify-center">
          <p className="font-semibold text-3xl pb-2">Sign Up</p>
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
              label="name"
              size="small"
              fullWidth
              required
              error={errorMessage}
              helperText={errorMessage ? "Error Signing Up" : ""}
              value={name}
              onChange={(event: any) => setName(event.target.value)}
            />
            <TextField
              label="email"
              size="small"
              fullWidth
              required
              value={email}
              onChange={(event: any) => setEmail(event.target.value)}
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
            <Button variant="outlined" onClick={signUp}>Sign Up</Button>
          </Box>

          {/* Already have account? login */}
          <Box className="pt-4 flex items-center justify-center">
            <Link href="/login">
              <Button className="text-black" size="small">
                Already have an account? Login
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
