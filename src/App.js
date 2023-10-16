import logo from './logo.svg';
import './App.css';
import MaterialUICardsExample from './UICardsExample/MaterialUICardsExample';
import Sample from './UICardsExample/Sample';
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import MaterialUICardsComponent from './UICardsExample/MaterialUICardsComponent';

const App = () => {
  return (
   /*  <div>
      <MaterialUICardsExample />
    </div> */

    <Router>
      <Routes>
        <Route path="/" element={<MaterialUICardsExample />} />
        <Route path="/materialcards" element={<MaterialUICardsComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
