import React from 'react'
import ho from "../assets/ho.jpg";
import { Avatar, Box, Stack, Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
      
      <Stack
        direction={{ xs: 'column', sx: 'column',xl:'row',md:'column',sm:'column'}}
        spacing={{ xs: 1, sm: 2, md:1 }}
        flexWrap={{sx:'wrap'}}
        alignContent={"center"}
        justifyContent={"center"}
      >
       <Box>
        <Typography  p={"1rem 2rem"} marginTop={"5rem"}>
        <Typography variant='h2' fontSize="2rem" lineHeight={2} textAlign={"center"}>Welcome to Niramay: Your Intelligent AI Assistant</Typography>
        <Typography variant='body1' lineHeight={"2"} fontSize={"1.2rem"}>Niramay is not just another AI. It's your personalized, generative AI assistant that goes beyond the ordinary. With advanced capabilities and a user-friendly interface, Niramay is here to transform the way you interact with technology.</Typography>
        </Typography>
       </Box>
       <Box>
        <Typography alignItems={"center"}marginTop={"5rem"} alignContent={"center"} sx={{padding:{md:"1rem 1rem",sm:"1rem 1rem",xs:"1rem 0rem"}}}>
          <img src={ho} alt="img" style={{backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",width:"100%",height:"auto",borderRadius:"10px 10px 10px 10px",}}/>
        </Typography>
       </Box>
      </Stack>
    </div>
  )
}

export default Home