import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ToDo() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [newTask, setNewTask] = useState("")
  const [myTaskList, setMyTaskList] = useState([]);
  const [completed, setCompleted] = useState([])
  const [checked, setChecked] = useState([])
  let taskList = [];

  const appendTaskList = () => {
    setMyTaskList([...myTaskList, {"id": Math.floor(Math.random() * 100), "task": newTask, "status": "active"}])
    setNewTask("")
  }

  const markTaskCompleted = (id) => {
    setMyTaskList((myTaskList) => {
        const updatedTask = myTaskList.map(x => {
            if(x.id === id){
                x.status = "completed"
                return x
            }
            return x
        })
        return updatedTask
    })
    console.log(myTaskList)
  }

  const editExistingTask = (id) => {
    setMyTaskList((myTaskList) => {
        const updatedTask = myTaskList.map(x => {
            if(x.id === id){
                x.task = newTask
                return x
            }
            return x
        })
        return updatedTask
    })
  }

  const deleteTask = (id) => {
    setMyTaskList((myTaskList) => {
      const updatedTask = myTaskList.filter(x => {
        if(x.id === id){
          return x.id != id
        }
        return x
      })
      return updatedTask
    })
  }

  return (
    <Box sx={{ width: '100%' , margin: "10px"}} >
      <h2 style={{margin: "75px"}}>To Do App</h2>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Active" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TextField value={newTask} id="outlined-basic" label="Add task" 
                    variant="outlined" onChange={(e) => {setNewTask(e.target.value)}}/>
        <Button variant="contained" onClick={appendTaskList} style={{margin: "5px"}}>Add Task</Button>
        {myTaskList.map((eachTask) => (
            <div>
                <FormGroup style={{display: "inline-block"}}>
                    <FormControlLabel control={<Checkbox checked={eachTask.status === "completed"}/>} label={eachTask.task} key={eachTask.id} 
                                    onChange={() => markTaskCompleted(eachTask.id)}/>
                </FormGroup>
                <Button variant='outlined' onClick={() => deleteTask(eachTask.id)}>Delete Task</Button>
            </div>
        ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <h3>Active Tasks</h3>
             {/*<TextField value={newTask} id="outlined-basic" label="Edit task" 
                        variant="outlined" onChange={(e) => {setNewTask(e.target.value)}}/>
            <Button variant="contained" onClick={editExistingTask} style={{margin: "5px"}}>Edit Task</Button> */}
            
            {myTaskList.map((eachTask) => (
                <>
                    <FormGroup>
                    { eachTask.status==="active" && 
                        <FormControlLabel control={<Checkbox />} label={eachTask.task} 
                                        onChange={() => editExistingTask(eachTask.id)}/>}
                    </FormGroup>
                </>
            ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            <>
            <h3>Completed Tasks</h3>
             {myTaskList.map((eachTask) => (
                <>
                    <FormGroup>
                      { eachTask.status==="completed" && 
                          <FormControlLabel control={<Checkbox checked/>} label={eachTask.task} />}
                    </FormGroup>
                </>
            ))}
            </>
        </CustomTabPanel>
    </Box>
  );
}
