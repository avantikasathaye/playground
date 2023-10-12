import React, {useState, useEffect} from 'react'

import { Card } from '@mui/material'

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
        axios.get("https://api.escuelajs.co/api/v1/products?offset=10&limit=12")

        .then((res)=>setImageSet(res.data))

        .catch((err) => console.log(err));

    }, [])

 

    const fetchMoreData = () => {

        
       setTimeout(() => {
        setArrayData((arrayData) => [...arrayData, ...Array.from({length: 20})])
      }, 500);
    };

  return (
    <div>
        <h2 style={{textAlign: 'center', margin: "50px"}}>Material UI Gallery</h2>
        <hr color='black' />
        <InfiniteScroll
            dataLength={imageSet.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            >
            <div className='container'>
                <div className='row'>
                {arrayData.map((i, index) => (
                    <div style={style} key={index}>
                        div - #{index}
                </div>
            ))}

              

                </div>

            </div>

        </InfiniteScroll>

    </div>

  )

}

 

export default MaterialUICardsExample