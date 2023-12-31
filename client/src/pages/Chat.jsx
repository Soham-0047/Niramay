import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import {useSelector} from 'react-redux'

import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";
import axios from "axios"
import TextFormat from "../components/TextFormat";
import AdbIcon from '@mui/icons-material/Adb';
import "../App.css"
import {HomeMiniOutlined, HomeOutlined} from "@mui/icons-material"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Provide youtube video links


const Chat = () => {


  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [formData,setFormData] = useState({})
  const [isLoading,setLoading] = useState(false);


  const {currentUser} = useSelector((state) =>state.user)


  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      // const res = await fetch(`/api/user/openai/${currentUser._id}`, { 
      //   method:"POST",
      //   headers:{
      //     "Content-Type":"application/json",
      //   },
      //   body:JSON.stringify({text})

      //  });
      // const data = await res.json();
      const { data } = await axios.post(`/api/user/openai/${currentUser._id}`, { text })
       
       if (data.error && data.error.includes("SAFETY")) {
        // Handle safety violation, e.g., filter or display an error message
        
        toast.error('Generated content violates safety guidelines');
       }
      // console.log(data);
      setResponse(data);
     

    } catch (err) {
      
      console.log(error);
      toast.error('An error occurred!',
          {
            position: "top-right",
            autoClose: 2200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        
        toast.info('Try to logout and signin again', {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      if (err.response.data.error) {
        setError(err.response.data.error);
        

        
      } else if (err.message) {
        setError(err.message);
      }
     
    }finally{
      setLoading(false);
    }
  };


  return (
  
       <Box
    width={isNotMobile ? "80%" : "80%"}
    p={"2rem"}
    m={"2rem auto"}
    borderRadius={5}
    sx={{boxShadow:"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}
    
    backgroundColor={"white"}
  >
    
    <form onSubmit={handleSubmit}  >
      <Typography variant="h3" textAlign="center" color="#2a9d8f" className="large rise">Ask With NIRAMAY</Typography>

      <TextField
        placeholder="add your questions"
        type="text"
        multiline={true}
        required
        margin="normal"
        fullWidth
        value={text}
        onChange={
          (e) =>{
            settext(e.target.value)
          }
        }
      />

      <Typography display="flex" >
         <Button
        type="submit"
        className='btn draw-border'
        variant='contained'
        size="large"
        startIcon={<AdbIcon/>}
        sx={{ color: "#2a9d8f",mt: 3,
        textAlign: "center", margin:"auto", padding:"0.7rem 6rem",fontWeight:"600",background:"#e9c46a"}}
      >
        {isLoading ? 'Loading...' : 'Chat'}
      </Button>
      </Typography>
     
      <Button 
        
        className='btn draw-border'
        variant='contained'
        size="small"
        
        startIcon={<HomeOutlined/>}
        sx={{ color: "#2a9d8f",
        textAlign: "center",position:"relative",
        padding:"0.1rem 0.1rem", margin:"auto",fontWeight:"200",background:"#e9c46a",textDecoration:"none"}}
      >
         <Link to="/" style={{textDecoration:'none', color:'#2a9d8f',}}>HOME</Link>
      </Button>
    </form>

    {response ? (
      <Card
        sx={{
          mt: 4,
          border: 1,
          boxShadow: 0,
          height: "auto",
          borderRadius: 5,
          borderColor: "natural.medium",
          bgcolor: "background.default",
        }}
      >
        <Typography p={2}>{TextFormat(response.generatedText)}</Typography>
      </Card>
    ) : (
      <Card
        sx={{
          mt: 4,
          border: 1,
          boxShadow: 0,
          height: "500px",
          borderRadius: 5,
          borderColor: "natural.medium",
          bgcolor: "background.default",
        }}
      >
        <Typography
          variant="h5"
          color="#2a9d8f"
          sx={{
            textAlign: "center",
            verticalAlign: "middel",
            lineHeight: "450px",
          }}
        >
          Niramay Response...
        </Typography>
      </Card>
    )}

   <ToastContainer
        position="top-right"
        autoClose={200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
  </Box>
    
   
  )
}

export default Chat