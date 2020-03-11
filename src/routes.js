import React from 'react'
import {Switch, Route} from 'react-router-dom'; 
import Auth from './Components/Auth'; 
import MyVehicles from './Components/MyVehicles';
import Form from './Components/Form'
import Maps from './Components/Maps'
import ForSale from './Components/ForSale'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile';


export default (
    <Switch>
        <Route exact path = '/' component = {ForSale} />
        <Route path = '/auth' component = {Auth}/>
        <Route path = '/MyVehicles/:id' component = {MyVehicles} />
        <Route path = '/form' component={Form} />
        <Route path = '/maps' component = {Maps}/>
        <Route path = '/dashboard' component = {Dashboard} />
        <Route path = '/profile' component = {Profile} />
    </Switch>
)