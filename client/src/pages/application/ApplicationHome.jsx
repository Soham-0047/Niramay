import { Typography } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


const ApplicationHome = () => {
  return (

    <>
    <Typography fontSize={"2rem"} textAlign={"center"}>More Applications Coming Soon</Typography>
    <div style={{margin: '10%'}}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={"Chevrolet"}
        alt="Chevrolet"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Paragraph Summerizer
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Summerize Your Paragraph
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Visit</Button>
        <Button size="small">Home</Button>
      </CardActions>
    </Card>
    </div> 
    </>
    
  )
}

export default ApplicationHome