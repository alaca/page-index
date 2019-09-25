import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import UsersList from './UserList'
import UsersProfile from './UsersProfile'
import './App.css'



function App() {

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={UsersList} />
                <Route path="/user/:id" component={UsersProfile} />
            </Switch>
        </Router>
    );
}

export default App;
