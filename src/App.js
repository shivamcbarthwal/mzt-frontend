import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import ExerciseCreate from './createComponent/ExerciseCreate.js'
import visualizeExercise from './createComponent/visualizeExercise.js'
import SessionCreate from './createComponent/SessionCreate.js'
import visualizeSession from './createComponent/visualizeSession.js'
import editSession from './createComponent/editSession.js'

function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/exercisesCreate" component={ExerciseCreate} />
          <Route path="/visualizeExercise" component={visualizeExercise} />
          <Route path="/sessionCreate" component={SessionCreate} />
          <Route path="/visualizeSession" component={visualizeSession} />
          <Route path="/editSession" component={editSession} />
      </Router>
    </div>
  );
}

export default App;
