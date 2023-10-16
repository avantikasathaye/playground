import React from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 , marginTop: "45px"}}>
      <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
          <Grid item xs={2} sm={4} md={4}>
            <Item variant="contained" component={Link} to="/todos">To Do App</Item>
            <Item variant="contained" component={Link} to="/cardsexample">Material UI Cards</Item>
          </Grid>
        
      </Grid>
    </Box>
  );
}

export default Dashboard
