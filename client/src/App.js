import React from 'react';
import './App.css';
import Login from './components/Login';
import Vote from "./components/Vote";
import Token from "./components/Token";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login}></Route>
      <Route path="/vote" component={Vote}></Route>
      <Route path="/ct-kpia" component={Token}></Route>
    </Router>
  );
}

export default App;
