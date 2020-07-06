import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import DelayPage from './delay'
import MobilesPage from './home'

function App() {
  return (
    <Router>
        <Route exact path="/" component={DelayPage} />
        <Route exact path="/mobiles" component={MobilesPage} />
   </Router>
  );
}


export default App;
