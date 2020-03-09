import React from 'react'
import {Switch, Route} from 'react-router-dom'; 
import Auth from './Components/Auth'; 

export default (
    <Switch>
        <Route path = '/auth' component = {Auth}/>
    </Switch>
)