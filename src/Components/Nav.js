import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'
import {getUser} from '../Duxx/reducer'


const Nav = () => {

    return(
        <div>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/auth' >Auth</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/MyVehicles' >My Vehicles</Link>
            <Link to='/' >For sale</Link>
            <Link to='/maps' >Maps</Link>
            <Link to='/form' >Form</Link>
        </div>
    )
}
export default Nav