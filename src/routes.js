import React from 'react'
import {Switch, Route} from 'react-router-dom'; 
import Auth from './Components/Auth'; 
import MyVehicles from './Components/MyVehicles';
import Form from './Components/Form'
import Maps from './Components/Maps'
import ForSale from './Components/ForSale'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile';
import InvVehicle from './Components/InvVehicle'
import PostForSale from './Components/PostForSale'


export default (
    <Switch>
        <Route path = '/ForSale' component = {ForSale} />
        <Route path = '/auth' component = {Auth}/>
        <Route path = '/MyVehicles' component = {MyVehicles} />
        <Route path = '/vehicles/:id' component = {InvVehicle} />
        <Route path = '/form' component={Form} />
        <Route path = '/maps' component = {Maps}/>
        <Route exact path = '/' component = {Dashboard} />
        <Route path = '/profile' component = {Profile} />
        <Route path = '/postforsale' component = {PostForSale}/>
    </Switch>
)