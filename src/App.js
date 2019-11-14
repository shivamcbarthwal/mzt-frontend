import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import logo from './logo.svg';
import './App.css';
import ExerciseCreate from './createComponent/ExerciseCreate.js'
import visualizeExercise from './createComponent/visualizeExercise.js'
import SessionCreate from './createComponent/SessionCreate.js'
import visualizeSession from './createComponent/visualizeSession.js'
import editSession from './createComponent/editSession.js'
import Homepage from './createComponent/Homepage.js'
import dashboard from './createComponent/Dashboard/dashboard.js'
import workout from './createComponent/workout.js'
import assignPtoC from './createComponent/AssignPtoC.js'
import CoachHome from './createComponent/CoachHome.js';
import ProgramTemplates from './createComponent/ProgramTemplates';
import CustomerModal from './createComponent/Customer/CustomerModal';
import focusSessionForm from './createComponent/focusSessionForm'
import focusSessionAgenda from './createComponent/focusSessionAgenda'
import focusSessionResult from './createComponent/focusSessionResult'
import visualizeProgram from './createComponent/VisualizeProgram'
import Customer from './createComponent/Customer/Customer';
import focusSessionStartExercise from './createComponent/focusSessionStartExercise'
import listOfSessions from './createComponent/listOfSessions/listOfSessions'
import listOfPrograms from './createComponent/listOfPrograms/listOfPrograms'
import createProgramT from './createComponent/createProgramT';
import AssignEtoS from './createComponent/AssignEtoS';
import AssignStoP from './createComponent/AssignStoP';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
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
          <Route path="/assignPtoC/:custId" component={assignPtoC} />
          <Route exact path="/" component={CoachHome} />
          <Route path="/ProgramTemplates" component={ProgramTemplates} />
          <Route path="/CustomersDetail/:customerID" component={CustomerModal} />
          <Route path="/focusSessionForm" component={focusSessionForm} />
          <Route path="/focusSessionAgenda/:programID" component={focusSessionAgenda} />
          <Route path="/focusSessionResult" component={focusSessionResult} />
          <Route path="/visualizeProgram" component={visualizeProgram} />
          <Route path="/customerList" component={Customer} />
          <Route path="/focusSessionStartExercise/:programID" component={focusSessionStartExercise} />
          <Route path="/listOfSessions/:programID" component={listOfSessions} />
          <Route path="/listOfPrograms" component={listOfPrograms} />
          <Route path="/createProgramT" component={createProgramT} />
          <Route path="/AssignEtoS" component={AssignEtoS} />
          <Route path="/AssignStoP" component={AssignStoP} />
      </Router>
    </div>
    </SnackbarProvider>
  );
}

export default App;
