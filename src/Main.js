import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';

export default function Main() {
  return (
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  )
}