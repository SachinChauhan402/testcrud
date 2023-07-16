import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import "./css/Dashboard.css"
import Edit from './components/Edit';


const App = () => {
  

  return (
    
      <div className='center-container'>
        
        <Routes>
       <Route path='/' exact element={ <Dashboard />} />
       <Route path='/edit' exact element={<Edit />} />
        </Routes>
      </div>
    
  );
};

export default App;
