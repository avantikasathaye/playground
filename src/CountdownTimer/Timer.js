import { Box, Button } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { COMPLETED, PAUSED, RESET, RESUMED, STARTED } from './constants';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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
    
    const [count, setCount] = useState(60);
    const [pause, setPause] = useState(false);
    const [message, setMessage] = useState("");
    const [togglePause, setTogglePause] = useState(false)
    const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
    
    const [minCount, setMinCount] = useState(value.$m);
    const [timerSetFor, setTimerSetFor] = useState(0);
    const [minsOver, setMinsOver] = useState(false);

    var intervalRef = useRef();
    var minutesIntervalRef = useRef();

    useEffect(()=>{
      if(minCount === 0) {
       setMinsOver(true)
       handleReset();
      }
     },[minCount])

    const decrement = () => {
      setCount((prev) => prev === 0 ? 60 : prev - 1);
    }

    const decrementMins = () => {
      setMinCount((prev) => prev === 0 ? 0 : prev - 1);
    }

    const handlePause = () => {
      
      if (!pause) {
        showToastMessage("Countdown-Paused ! ", PAUSED)
        clearInterval(intervalRef.current);
        clearInterval(minutesIntervalRef.current);
      } else {
        showToastMessage("Countdown-Resumed ...", RESUMED)
        intervalRef.current = setInterval(decrement, 1000);
        minutesIntervalRef.current = setInterval(decrement, 60000);
      }
      setPause((prev) => !prev);
      };

      const [open, setOpen] = useState(false);

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
        minutesIntervalRef.current = setInterval(decrementMins, 60000);
        setTogglePause(true);
    }

    const handleReset = () => {
      setMinsOver(false);
        setCount(60);
        clearInterval(intervalRef.current);
        //showToastMessage("Countdown-Reset ...", RESET);
        return(<Alert severity='info'>AlertReset</Alert>)
    }

    const showToastMessage = (toastMessage, type) => {
      if(count === 0 && type == COMPLETED){
        /* toastMessage = "Countdown Completed !"
        toast.success(toastMessage, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: 'completed1',
        }); */
        return (<Alert severity="success">CountDown Completed</Alert>)
      }else if(type == STARTED){
        return (<Alert severity="info">{toastMessage}</Alert>)
      }else if(type == RESET){
        return (<Alert severity="info">{toastMessage}</Alert>)
      }
  };

  const timerValue = (newValue) => {
      // Get the difference: 
      /* var currentTime = new Date();
      var currentTimeInMinutes = currentTime.getMinutes();
      var difference = newValue.$m - currentTimeInMinutes;
      setTimerSetFor(difference);
      setMinCount(difference); */


      var currentTime = new Date().getTime();
      debugger;
      console.log(newValue)
  
  }

  return (
    <>
     <div className="centerAlign">
      <h3>CountDown Timer</h3>
    </div>
    <div className="centerAlign">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <TimePicker
          label="Controlled picker"
          value={value}
          disablePast={true}
          onChange={(newValue) => {timerValue(newValue)}}
        />
      </DemoContainer>
    </LocalizationProvider>
    </div>
    <Box className="centerAlign">
      <div> {String(minCount).padStart(2, '0')} : {minsOver ? String(0).padStart(2, '0') : String(count).padStart(2, '0')}</div>
      
    </Box>
    <p className='centerAlign'>The countdown timer has been set for {timerSetFor} minute(s)</p>
    <Box  className="centerAlign">
      <Button style={{margin: "10px"}} variant="contained" onClick={handlePause} disabled={!togglePause}>{pause ? "Resume" : "Pause"}</Button>
      <Button style={{margin: "10px"}} variant="contained" onClick={handleStart} disabled={count < 60}>Start</Button>
      <Button style={{margin: "10px"}} variant="contained" onClick={handleReset}>Reset</Button>
    </Box>
    
    {count === 0 ? showToastMessage("Completed", COMPLETED) : null}
    <ToastContainer />
    </>
  )
}

export default Timer



