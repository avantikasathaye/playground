import { Box, Button } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react'

const Timer = () => {
    var t = new Date();
    var time_in_seconds = t.getSeconds();

    var newSeconds = t.setSeconds(t.getSeconds() + 10);
    var diff = (Math.floor((newSeconds % (1000*60))/1000)) - time_in_seconds;

    var time_in_minutes = t.getMinutes() - t.getMinutes();
    var formatted_T_minutes = String(time_in_minutes).padStart(2,'0');
    
    const [count, setCount] = useState(diff);
    const [pause, setPause] = useState(false);
    const [message, setMessage] = useState("Countdown Timer");

    let intervalRef = useRef();

    const decrement = () => setCount((prev) => prev === 0 ? 0 : prev - 1);

    const handlePause = () => {
      if (!pause) {
        setMessage("Countdown Paused ...")
        clearInterval(intervalRef.current);
      } else {
        setMessage("Countdown Resumed ...")
        intervalRef.current = setInterval(decrement, 1000);
      }
      setPause((prev) => !prev);
      };

    const handleStart = () => {
        setMessage("Countdown Started ... ")
        intervalRef.current = setInterval(decrement, 1000);
    }

    const handleReset = () => {
        setCount(diff);
        clearInterval(intervalRef.current);
    }

  return (
    <>
     <div className="centerAlign">
      <h3>CountDown Timer</h3>
    </div>
    <Box className="centerAlign">
      <div>{formatted_T_minutes} : {String(count).padStart(2, '0')}</div>
    </Box>
    <Box  className="centerAlign">
      <Button style={{margin: "10px"}} variant="contained" onClick={handlePause} disabled={count === diff || count === 0}>{pause ? "Resume" : "Pause"}</Button>
      <Button style={{margin: "10px"}} variant="contained" onClick={handleStart} disabled={count < 10}>Start</Button>
      <Button style={{margin: "10px"}} variant="contained" onClick={handleReset}>Reset</Button>
    </Box>

    <p className='centerAlign'>{count === 0 ? "Countdown Completed!" : message}</p>
    </>
  )
}

export default Timer



