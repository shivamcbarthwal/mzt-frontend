import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import logo from './logo.svg'
import './app.css'

import CoachHome from './createComponent/coach/coachHome.js'
import VisualizeExercise from './createComponent/coach/visualizeExercise.js'
import CreateExercise from './createComponent/coach/createExercise.js'
import VisualizeSession from './createComponent/coach/visualizeSession.js'
import CreateSession from './createComponent/coach/createSession.js'
import EditSession from './createComponent/coach/editSession.js'
import AssignEtoS from './createComponent/coach/assignEtoS'
import VisualizeProgram from './createComponent/coach/visualizeProgram'
import CreateProgramT from './createComponent/coach/createProgramT'
import AssignStoP from './createComponent/coach/assignStoP'
import AssignPtoC from './createComponent/coach/assignPtoC.js'
import ProgramTemplates from './createComponent/coach/programTemplates'
import CustomerModal from './createComponent/coach/customerModal'
import Customer from './createComponent/coach/customer.js'
import Feedback from './createComponent/coach/feedback.js'
import Challenge from './createComponent/customer/challenge.js'
import Homepage from './createComponent/customer/homepage.js'
import Sponsor from './createComponent/customer/sponsor'
import Dashboard from './createComponent/customer/dashboard/dashboard.js'
import ListOfPrograms from './createComponent/customer/listOfPrograms/listOfPrograms'
import ListOfSessions from './createComponent/customer/listOfSessions/listOfSessions'
import RegularSessionStartExercise from './createComponent/customer/regularSessionStartExercise'
import FocusSessionForm from './createComponent/customer/focusSessionForm'
import FocusSessionAgenda from './createComponent/customer/focusSessionAgenda'
import FocusSessionStartExercise from './createComponent/customer/focusSessionStartExercise'
import FocusSessionResult from './createComponent/customer/focusSessionResult'

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
          <Route path="/feedback/:coachID/:custID/:progID/:sessID" component={Feedback} />         
          <Route path="/homepage" component={Homepage} />
          <Route path="/challenge" component={Challenge} />
          <Route path="/sponsor" component={Sponsor} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/listOfPrograms" component={ListOfPrograms} /> 
          <Route path="/listOfSessions/:programID" component={ListOfSessions} /> 
          <Route path="/regularSessionStartExercise/:programID" component={RegularSessionStartExercise} />
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
