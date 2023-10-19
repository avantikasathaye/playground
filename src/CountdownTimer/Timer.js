import { Box, Button } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { COMPLETED, PAUSED, RESET, RESUMED, STARTED } from './constants';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Timer = () => {
    var t = new Date();
    var timeInSeconds = t.getSeconds();

    var newSeconds = t.setSeconds(t.getSeconds() + 10);
    var diff = (Math.floor((newSeconds % (1000*60))/1000)) - timeInSeconds;

    var timeInMinutes = t.getMinutes() - t.getMinutes();
    var formattedTimeInMinutes = String(timeInMinutes).padStart(2,'0');
    
    const [count, setCount] = useState(10);
    const [pause, setPause] = useState(false);
    const [message, setMessage] = useState("");
    const [togglePause, setTogglePause] = useState(false)

    var intervalRef = useRef();

    const decrement = () => {
      setCount((prev) => prev === 0 ? 0 : prev - 1);
    }

    const handlePause = () => {
      
      if (!pause) {
        showToastMessage("Countdown-Paused ! ", PAUSED)
        clearInterval(intervalRef.current);
      } else {
        showToastMessage("Countdown-Resumed ...", RESUMED)
        intervalRef.current = setInterval(decrement, 1000);
      }
      setPause((prev) => !prev);
      };

      const [open, setOpen] = React.useState(false);

      const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    

    const handleStart = () => {
        setOpen(true);
        showToastMessage("Countdown-Started ... ", STARTED);
        intervalRef.current = setInterval(decrement, 1000);
        setTogglePause(true);
    }

    const handleReset = () => {
        setCount(10);
        clearInterval(intervalRef.current);
        //showToastMessage("Countdown-Reset ...", RESET);
        return(<Alert severity='info'>AlertReset</Alert>)
    }

    const showToastMessage = (toastMessage, type) => {
      debugger;
      if(count === 0 && type == COMPLETED){
        toastMessage = "Countdown Completed !"
        toast.success(toastMessage, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: 'completed1',
        });
        return (<Alert severity="success">CountDown Completed</Alert>)
      }else if(type == STARTED){
        return (<Alert severity="success">{toastMessage}</Alert>)
      }else if(type == RESET){
        return (<Alert severity="success">{toastMessage}</Alert>)
      }
  };

  return (
    <>
     <div className="centerAlign">
      <h3>CountDown Timer</h3>
    </div>
    <Box className="centerAlign">
      <div>{formattedTimeInMinutes} : {String(count).padStart(2, '0')}</div>
    </Box>
    <Box  className="centerAlign">
      <Button style={{margin: "10px"}} variant="contained" onClick={handlePause} disabled={!togglePause}>{pause ? "Resume" : "Pause"}</Button>
      <Button style={{margin: "10px"}} variant="contained" onClick={handleStart} disabled={count < 10}>Start</Button>
      <Button style={{margin: "10px"}} variant="contained" onClick={handleReset}>Reset</Button>
    </Box>
    
    {count === 0 ? showToastMessage("Completed", COMPLETED) : null}
    
    <ToastContainer />
    </>
  )
}

export default Timer



