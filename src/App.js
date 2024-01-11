// Importing necessary components from the corresponding files
import LoginPage from "./LoginPage";
import Home1 from "./Home";
import Welcome from "./Welcome";

import List from "./List";

// Importing necessary components from the react-router-dom library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

// Main App component
function App() {
  return (
   
    <div className="App">   
      <Router>      
        <Routes>          
          <Route path="/welcome" element={<Welcome />} />      
          <Route path="/login" element={<LoginPage />} />     
            
          <Route path="/" element={<Home1 />} />         
          <Route path="/list" element={<List />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
