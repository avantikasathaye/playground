import React from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 , marginTop: "25px"}}>
      <Grid container spacing={{ xs: 4, sm: 4, md: 8}} columns={{ xs: 4, sm: 8, md: 12 }} style={{ justifyContent: "center"}}>
        
          <Grid item xs={2} sm={4} md={4} style={{margin: "10px"}}>
            <Item variant="contained" component={Link} to="/todos" style={{margin: "10px", fontWeight: "bold"}}>
            <FormatListBulletedIcon />
              To Do App</Item>
            <Item variant="contained" component={Link} to="/cardsexample" style={{ fontWeight: "bold"}}>
              <DashboardIcon />
              Material UI Cards</Item>
          </Grid>
        
      </Grid>
    </Box>
  );
}

export default Dashboard
