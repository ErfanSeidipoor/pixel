import React from 'react';
import { Router, Route } from 'react-router-dom'
import Fame from './pages/fame'
import Fames from './pages/fames'
import Login from './pages/login'
import Logout from './pages/logout'
import history from './history'
import './App.css';

import {
  LOGIN,
  LOGOUT,
  FAMES,
  FAME,
} from './path'


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path={LOGIN} exact component={Login}  history={history}/>
        <Route path={LOGOUT} exact component={Logout}  history={history}/>
        <Route path={FAME} exact component={Fame}  history={history}/>
        <Route path={[FAMES, "/"]} exact component={Fames}  history={history}/>
      </Router>
    </div>
  );
}

export default App;
