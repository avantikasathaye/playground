import { Card, CardMedia, Typography, CardContent, ThemeProvider, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import welcomeBanner from "../assets/welcomeBanner.jpeg"
import { lime, purple } from '@mui/material/colors';
import axios from 'axios';


const theme = createTheme({
    palette: {
      primary: lime,
      secondary: purple,
    },
  });

const MaterialUICardsComponent = () => {

    const [imageList, setImageList] = useState([]);


    useEffect(() => {
        try{
            const response = axios.get("https://jsonplaceholder.typicode.com/photos")
        }
        catch(err){
            console.log(err)
        }
    })

    const cardData = [{pillText: ""}]

  return (
    <div>
        <ThemeProvider theme={theme}>
        <h2 style={{textAlign: 'center', margin: "50px", fontFamily:"Century  Gothic"}}>Innovya Technologies</h2>
        <Card sx={{ maxWidth: 345 }} className='flex flex-col h-384 shadow'>
            <CardMedia sx={{height: "140"}} title="Welcome To The Team" image="src\assets\welcomeBanner.jpeg"/>
            <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Innovya Technologies
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Innovya Technologies is leading in helping clients to rapidly implement digital transformation strategies in healthcare domain.
        </Typography>
      </CardContent>
        </Card>
        </ThemeProvider>
    </div>
  )
}

export default MaterialUICardsComponent
