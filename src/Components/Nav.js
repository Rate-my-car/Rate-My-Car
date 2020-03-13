import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'
import {getUser} from '../Duxx/reducer'
import logo from './styling/checkup-logo-header.svg'
import './styling/Nav.scss'


const Nav = (props) => {

    const [toggleDropdown, setToggleDropdown] = useState(false);

    const showDropdown = () => {
        setToggleDropdown(!toggleDropdown)
    }

    
   

    return(
        <div>
            <div className='header-container'>
                <header>
                    <div className='desktop-nav'>
                        <nav className='header-left'>
                            <img src={logo} className='header-logo' alt='Checkup Logo' onClick={() => props.history.push('/')}/>
                            <Link to='/' className='nav-link'>Home</Link>
                            <Link to='/ForSale' className='nav-link'>Cars for Sale</Link>
                            <Link to='/maps' className='nav-link'>Service Locator</Link>
                        </nav>
                        <nav className='header-right'>
                            {props.user.user_id ? (
                                <nav>
                                    <Link to='/MyVehicles' className='nav-link'>My Vehicles</Link>
                                    <div className='profile-container'>
                                        <img src={props.user.userPicture} className= 'header-profile-pic' alt='user profile pic'/>
                                        <div className='welcome-user-container'>
                                            Welcome {props.user.first_name}
                                        </div>
                                    </div>
                                </nav>
                            ) : (
                                <Link to='/auth' className='nav-link'>Login/Register</Link>
                            )}
                        </nav>
                    </div>
                    <nav className='mobile-nav'>
                        <img src={logo} className='header-logo' alt='Checkup Logo' onClick={() => props.history.push('/')}/>
                        <div id='mobile-menu-btn' onClick={showDropdown}>&#9776;</div>
                    </nav>
                </header>
            </div>

            {toggleDropdown ? (
                <div className='dropdown-container'>
                    <div className='dropdown-nav-links'>
                        {props.user.user_id ? (
                            <nav>
                                <p className='nav-link' id='dropdown-welcome-text'>
                                    Welcome
                                </p>
                                <p id='dropdown-username'>
                                    {props.user.first_name} {props.user.last_name.splice(0,1)}.
                                </p>
                                <Link to='/MyVehicles' className='nav-link' onClick={showDropdown}>My Vehicles</Link>
                            </nav>
                        ) : (
                            <Link to='/auth' className='nav-link' onClick={showDropdown}>Login/Register</Link>
                        )}
                        <hr id='dropdown-line'/>
                        <Link to='/' className='nav-link' onClick={showDropdown}>Home</Link>
                        <Link to='/ForSale' className='nav-link' onClick={showDropdown}>Cars for Sale</Link>
                        <Link to='/maps' className='nav-link' onClick={showDropdown}>Service Locator</Link>
                    </div>
                </div>
            ) : (
                null
            )}

        </div>
    )
}


function mapStateToProps(state){ 
    return{user: state.reducer.user}
}

export default connect(mapStateToProps, {getUser})(withRouter(Nav));




{/* <Link to='/dashboard'>Dashboard</Link>
<Link to='/auth' >Auth</Link>
<Link to='/profile'>Profile</Link>
<Link to='/MyVehicles' >My Vehicles</Link>
<Link to='/' >For sale</Link>
<Link to='/maps' >Maps</Link>
<Link to='/form' >Form</Link> */}