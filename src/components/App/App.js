import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AccessPage from '../pages/AccessPage'
import Main from '../pages/Main'

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path='/'>
                <AccessPage/>
            </Route>
            
            <Route exact path='/main'>
              <Main/>
            </Route>

        </Switch>
    </Router> 
  );
}

export default App;
