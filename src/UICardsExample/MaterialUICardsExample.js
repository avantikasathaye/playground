import React, {useState, useEffect} from 'react'
import { Button, Card } from '@mui/material'
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import images from './images.json';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './Loader'; 
import { Link } from 'react-router-dom';

const classes = {

    root: {

      flexGrow: 1

    },

    paper: {

      padding: 20,

      textAlign: "center",

      color: "blue",

      fontFamily: "Roboto"

    }

  };

 

  const style = {

    height: 30,

    border: "1px solid green",

    margin: 6,

    padding: 8

  };

 

const MaterialUICardsExample = () => {

    const [imageSet, setImageSet] = useState([]);
    const [arrayData, setArrayData] = useState(Array.from({ length: 20 }))
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);
 

    useEffect(() => {

      try{
        const getData = async () => {
          const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0" , {credentials: "same-origin"})
          //const response = await axios.get("https://jsonplaceholder.typicode.com/photos", {credentials: "same-origin"})
          setImageSet(response.data.results)
        }

        getData();
      }
      catch(err){
        console.log(err)
      }
    }, [])

 

    const fetchMoreData = () => {

        /* Data fetched from an API using axios */

           setTimeout(() => {
            axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=${index}`, 
                    {credentials: "same-origin", 
                      "Access-Control-Allow-Origin": "*"}) 
            //axios.get("https://jsonplaceholder.typicode.com/photos")
            .then((res) => {
              debugger;
                setImageSet((prevItems) => [...prevItems, ...res.results.data])
                res.data.results.length > 0 ? setHasMore(true) : setHasMore(false)
            })
            .catch((err) => console.log(err));
            setIndex((prevIndex) => prevIndex + 1);
        }, 500);

        /* Just random infinite data - to test Infinite Scrolling */
      /*  setTimeout(() => {
        setArrayData((arrayData) => [...arrayData, ...Array.from({length: 20})])
      }, 500); */
    };

  return (

    <div>
        <h2 style={{textAlign: 'center', margin: "50px"}}>Material UI Gallery</h2>
        <Box textAlign={'center'}>
          <Button component={Link} to="/materialcards" variant="contained" style={{alignContent: "center"}}>Cards Component</Button>
        </Box>
        
        <hr color='black' />
        <InfiniteScroll
            dataLength={imageSet.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            >
            <div className='container'>
                <div className='row'>
                  {/* {arrayData.map((i, index) => (
                      <div style={style} key={index}>
                          div - #{index}
                      </div>
                  ))} */}

               {/*   Using CardMedia  / CardContent  */}
               <Box sx={{ flexGrow: 0 }}>
                    <Grid container spacing={12}>
                    {imageSet && imageSet.map((eachImage, index) => (
                         <Grid item xs={6} sm={3}>
                         <CardMedia
                           component="img"
                           sx={{ height: 240, width: 240 }}
                           image={eachImage.url}
                           alt="Product Image"
                           key={eachImage.albumId}
                        />
                         <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {eachImage.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {eachImage.title}
                            </Typography>
                        </CardContent>
                       </Grid>
                    ))}
                  </Grid>
                  </Box>
                </div>
            </div>
        </InfiniteScroll>

      

      <div style={classes.root}>
      {/* <Grid container spacing={3}>
        {images.map((eachImage, index) => (
             <Grid item xs={6} sm={3}>
             <CardMedia
               component="img"
               sx={{ height: 240, width: 240 }}
               image={eachImage.image}
               alt={eachImage.text}
            />

             <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {eachImage.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {eachImage.title}
                </Typography>
            </CardContent>
           </Grid>
        ))}
      </Grid> */}

     {/*  <ImageList sx={{ width: 500, height: 450 }}>
        {images.map((item) => (
            <ImageListItem key={item.image}>
            <img
                srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={item.image}
                alt={item.title}
                loading="lazy"
            />

              <ImageListItemBar
                  title={item.title}
                  subtitle={<span>by: {item.title}</span>}
                  position="below"
              />
            </ImageListItem>
        ))}
    </ImageList> */}
    </div>
    </div>
  )

}

 

export default MaterialUICardsExample