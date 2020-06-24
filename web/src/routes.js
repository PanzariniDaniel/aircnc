import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// minhas paginas
import Login from './pages/Login';
import New from './pages/New';
import Dashboard from './pages/Dashboard';


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route component={New} path="/new" />
        <Route component={Dashboard} path="/dashboard" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
