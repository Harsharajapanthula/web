import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homie from './Homie.jsx';
import Menu from './Menu.jsx';
import OrderSummary from './OrderSummary.jsx';
import TableList from './Tablelist.jsx';
import First from './First.jsx'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
           <Route path="/" element={<Homie />} /> 
          <Route path='/First' element ={<First/>}/>
          <Route path="/Menu" element={<Menu />}/>
          <Route path="/Contacts" element={<div>Contacts Page</div>} />
          <Route path="/About" element={<div>About Page</div>} />
          <Route path="/OrderSummary" element={<OrderSummary/>}/>
          <Route path="/TableList" element={<TableList/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
