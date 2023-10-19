import logo from './logo.svg';
import './App.css';
import MaterialUICardsExample from './UICardsExample/MaterialUICardsExample';
import ToDo from './ToDoApp/ToDo';
import Dashboard from './ToDoApp/Dashboard';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 
import { Button } from '@mui/material';
import Timer from './CountdownTimer/Timer';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <Router>
    <div>
      <h2 style={{textAlign:"center"}}>
        <Button variant='outlined' component={Link} to="/">Avantika's Dashboard</Button>
        {/* <Link to="/">Your Dashboard</Link> */}
      </h2>
      <Routes>
        <Route path="/" Component={Dashboard}/>
        <Route path="/todos" Component={ToDo}/>
        <Route path="/cardsexample" Component={MaterialUICardsExample}/>
        <Route path="/countdowntimer" Component={Timer}/>
      </Routes>
      {/* <ToDo /> */}
    </div>
   
    </Router>
  );
}

export default App;
