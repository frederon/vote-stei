import React from 'react';
import './App.css';
import Login from './components/Login';
import Vote from "./components/Vote";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login}></Route>
      <Route path="/vote" component={Vote}></Route>
    </Router>
  );
}

export default App;
