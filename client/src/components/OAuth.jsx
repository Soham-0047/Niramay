import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Container, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      // console.log(data);

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Unable to Sign in with Google", error);
    }
  };

  return (
  
      <Button
        aria-label="Login with Google"
        variant="outlined"
        onClick={handleGoogleClick}
        fullWidth
        sx={{
          
          width: "80%",
          padding: 2,
          mt: 3,
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          color:"#f4a261",
          borderRadius: theme => theme.shape.borderRadius,
          "&:focus": {
            ring: "2px",
            ringOffset: "1px",
            ringColor: theme => theme.palette.primary.main,
          },
        }}

        startIcon={<GoogleIcon/>}
      >
        
        <Typography>Sign In with Google</Typography>
      </Button>
    
  );
};

export default OAuth;
