import React from 'react'
import {Switch, Route} from 'react-router-dom'; 
import Auth from './Components/Auth'; 
import MyVehicles from './Components/MyVehicles';

export default (
    <Switch>
        <Route path = '/auth' component = {Auth}/>
        <Route path = '/myvehicles' component = {MyVehicles} />
    </Switch>
)