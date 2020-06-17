import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import DelayPage from './delay'
import HomePage from './home'

function App() {
  return (
    <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/delay-simulator" component={DelayPage} />
   </Router>
  );
}


export default App;
