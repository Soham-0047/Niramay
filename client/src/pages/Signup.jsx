import {React,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import OAuth from '../components/OAuth';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {


  const [formData,setFormData] = useState({})
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const defaultTheme= createTheme();

  const handleChange =(e)=>{

  setFormData(
      {...formData,[e.target.id]: e.target.value})

      // console.log(formData)
      
  }

  const handleSubmit = async(e) =>{
      
      e.preventDefault();

      try {
        
      //* Instead of doing tghis http://localhost:5000/api/auth/signup we can use proxy in vite-config section for production ready code

      setLoading(true)
      setError(false);
      const res = await fetch('api/auth/signup',{
          
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
  })

      const data = await res.json();

      // console.log(data); 
      setLoading(false);

      if(data.success === false){
          setError(true)
          return;
      }
      toast.success('Successfully Signup',
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
      navigate('/chat')
      
      } catch (error) {
          setLoading(false);
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
          setError(true)
      }

  }

  return (
  <ThemeProvider theme={defaultTheme}>
    
       
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#2a9d8f' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              onChange={handleChange}
            />

        <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor:"#f4a261" }}
            >
              {loading? "Loading...":"Sign Up"}
            </Button>
            
             
          </Box>

          <Grid container>
            
              <Grid item>
                <Link to="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
         <OAuth/>
        </Box>
       
      </Container>
    
  
    </ThemeProvider>


  )
}

export default Signup