import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AccessPage from '../pages/AccessPage'
import StudentsList from '../studentsList/StudentsList'
import Navigation from '../navigation/Navigation'
import AddEditStudent from '../addEditStudent/AddEditStudent'

import './App.css'

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path='/'>
                <AccessPage/>
            </Route>
            
            <Route exact path='/main'>
              <section class="students">
                <StudentsList/>
                <Navigation/>
              </section>
              <AddEditStudent/>
            </Route>

        </Switch>
    </Router> 
  );
}

export default App;
