import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import ExerciseCreate from './Components/Exercises/ExerciseCreate/ExerciseCreate';
import SignInSide from './Components/SignIn/SignInSide';
import Exercises from './Components/Exercises/Exercises';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={SignInSide} />
          <Route path="/exercisesCreate" component={ExerciseCreate} />
          <Route path="/exercises" component={Exercises} />
      </Router>
    </div>
  );
}

export default App;
