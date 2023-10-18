import { Box, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'

const Timer = () => {

   /*  const startTiming = () => {
      var date = new Date(0);
      date.setSeconds(10); 
      var timeString = date.toISOString().substring(11, 19);
      console.log(timeString)
    } */

    var t = new Date();
    var t_in_seconds = t.getSeconds();

    var newSeconds = t.setSeconds(t.getSeconds() + 10);
    var diff = (Math.floor((newSeconds % (1000*60))/1000)) - t_in_seconds;

    var t_in_minutes = t.getMinutes() - t.getMinutes();
    var formatted_T_minutes = String(t_in_minutes).padStart(2,'0');
    //console.log((Math.floor((newSeconds % (1000*60))/1000)) - t_in_seconds);

    //const countDownDate = new Date(targetDate).getTime();
    /* const [timerCount, setTimerCount] = useState(
       Math.round(new Date().getTime() / 1000)
    ) */

    const [count, setCount] = useState(diff);
    const [pause, setPause] = useState(false);

    let intervalRef = useRef();

    const decrement = () => setCount((prev) => prev === 0 ? 0 : prev - 1);

    /* useEffect(() => {
        intervalRef.current = setInterval(decrement, 1000);
        return () => clearInterval(intervalRef.current);
    }, []); */

    const handlePause = () => {
        /* if (!pause) {
          clearInterval(intervalRef.current);
        } else {
          intervalRef.current = setInterval(decrement, 1000);
        } */

        clearInterval(intervalRef.current);
        setPause((prev) => !prev);
      };

    const handleStart = () => {
        intervalRef.current = setInterval(decrement, 1000);
    }

    const handleReset = () => {
        setCount(diff);
        clearInterval(intervalRef.current);
    }

  return (
    <>
    <Box style={{display:"flex",
                justifyContent:"center",
                alignItems:"center"}}>

      <div>{formatted_T_minutes} :{String(count).padStart(2, '0')}</div>
    
    </Box>
    <Box  style={{display:"flex",
                justifyContent:"center",
                alignItems:"center",
                minHeight:"1vh"}}>
        
      <Button style={{margin: "10px"}} variant="contained" onClick={handlePause}>Pause</Button>
      <Button style={{margin: "10px"}} variant="contained" onClick={handleStart}>Start</Button>
      <Button style={{margin: "10px"}} variant="contained" onClick={handleReset}>Reset</Button>
    </Box>
    </>
  )
}

export default Timer



