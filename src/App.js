import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import ExerciseCreate from './createComponent/ExerciseCreate.js'
import visualizeExercise from './createComponent/visualizeExercise.js'
import SessionCreate from './createComponent/SessionCreate.js'
import visualizeSession from './createComponent/visualizeSession.js'
import editSession from './createComponent/editSession.js'
import Homepage from './createComponent/Homepage.js'
import dashboard from './createComponent/dashboard.js'
import workout from './createComponent/workout.js'
import assignPtoC from './createComponent/AssignPtoC.js'
import CoachHome from './createComponent/CoachHome.js';
import ProgramTemplates from './createComponent/ProgramTemplates';
import Customers from './createComponent/Customers';
import focusSessionForm from './createComponent/focusSessionForm'
import focusSessionAgenda from './createComponent/focusSessionAgenda'
import focusSessionResult from './createComponent/focusSessionResult'
import visualizeProgram from './createComponent/VisualizeProgram'

function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/exerciseCreate" component={ExerciseCreate} />
          <Route path="/visualizeExercise" component={visualizeExercise} />
          <Route path="/sessionCreate" component={SessionCreate} />
          <Route path="/visualizeSession" component={visualizeSession} />
          <Route path="/editSession" component={editSession} />
          <Route path="/homepage" component={Homepage} />
          <Route path="/dashboard" component={dashboard} />
          <Route path="/workout" component={workout} />
          <Route path="/assignPtoC" component={assignPtoC} />
          <Route path="/coachHome" component={CoachHome} />
          <Route path="/ProgramTemplates" component={ProgramTemplates} />
          <Route path="/Customers" component={Customers} />
          <Route path="/focusSessionForm" component={focusSessionForm} />
          <Route path="/focusSessionAgenda" component={focusSessionAgenda} />
          <Route path="/focusSessionResult" component={focusSessionResult} />
          <Route path="/visualizeProgram" component={visualizeProgram} />
      </Router>
    </div>
  );
}

export default App;
