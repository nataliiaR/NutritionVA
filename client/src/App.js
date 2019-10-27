import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import NotFound from "./components/NotFound/NotFound.js";
import Navbar from "./components/Navbar/Navbar.js";
import MyAccount from "./pages/MyAccount/MyAccount";
import Footer from './components/Footer/Footer.js';


export function makeMainRoutes() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
        <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/myaccount" component={MyAccount} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
