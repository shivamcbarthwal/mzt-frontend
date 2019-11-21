import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import logo from './logo.svg';
import './App.css';

import CoachHome from './createComponent/coachHome.js'
import VisualizeExercise from './createComponent/visualizeExercise.js'
import CreateExercise from './createComponent/createExercise.js'
import VisualizeSession from './createComponent/visualizeSession.js'
import CreateSession from './createComponent/createSession.js'
import EditSession from './createComponent/editSession.js'
import AssignEtoS from './createComponent/assignEtoS'
import VisualizeProgram from './createComponent/visualizeProgram'
import CreateProgramT from './createComponent/createProgramT'
import AssignStoP from './createComponent/assignStoP'
import AssignPtoC from './createComponent/assignPtoC.js'
import ProgramTemplates from './createComponent/programTemplates'
import CustomerModal from './createComponent/Customer/customerModal'
import Customer from './createComponent/Customer/customer'

import Homepage from './createComponent/homepage.js'
import Challenge from './createComponent/challenge.js'
import Dashboard from './createComponent/Dashboard/dashboard.js'
import Workout from './createComponent/workout.js'
import ListOfPrograms from './createComponent/listOfPrograms/listOfPrograms'
import ListOfSessions from './createComponent/listOfSessions/listOfSessions'
import FocusSessionForm from './createComponent/focusSessionForm'
import FocusSessionAgenda from './createComponent/focusSessionAgenda'
import FocusSessionStartExercise from './createComponent/focusSessionStartExercise'
import FocusSessionResult from './createComponent/focusSessionResult'

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
    <div className="App">
      <Router>
          <Route exact path="/" component={CoachHome} />
          <Route path="/visualizeExercise" component={VisualizeExercise} />
          <Route path="/createExercise" component={CreateExercise} />
          <Route path="/visualizeSession" component={VisualizeSession} />
          <Route path="/createSession" component={CreateSession} />
          <Route path="/editSession" component={EditSession} />
          <Route path="/assignEtoS" component={AssignEtoS} />
          <Route path="/visualizeProgram" component={VisualizeProgram} />
          <Route path="/createProgramT" component={CreateProgramT} />
          <Route path="/assignStoP" component={AssignStoP} />       
          <Route path="/assignPtoC/:custId" component={AssignPtoC} />
          <Route path="/programTemplates" component={ProgramTemplates} />
          <Route path="/customersDetail/:customerID" component={CustomerModal} />
          <Route path="/customerList" component={Customer} />
          
          <Route path="/homepage" component={Homepage} />
          <Route path="/challenge" component={Challenge} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/workout" component={Workout} /> 
          <Route path="/listOfPrograms" component={ListOfPrograms} /> 
          <Route path="/listOfSessions/:programID" component={ListOfSessions} />   
          <Route path="/focusSessionForm" component={FocusSessionForm} />
          <Route path="/focusSessionAgenda/:programID" component={FocusSessionAgenda} />                    
          <Route path="/focusSessionStartExercise/:programID" component={FocusSessionStartExercise} />
          <Route path="/focusSessionResult" component={FocusSessionResult} />
      </Router>
    </div>
    </SnackbarProvider>
  );
}

export default App;