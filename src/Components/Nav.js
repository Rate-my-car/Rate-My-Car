import React, { useState } from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
// import axios from 'axios'
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
                            <Link to='/ForSale' className='nav-link'>Vehicles for Sale</Link>
                            <Link to='/maps' className='nav-link'>Service Locator</Link>
                        </nav>
                        <nav >
                            {props.user.user_id ? (
                                <nav className='header-right'>
                                    <Link to='/MyVehicles' className='nav-link'>My Vehicles</Link>
                                    <div className='profile-container' onClick={() => props.history.push('/profile')}>
                                        <img src={props.user.user_picture} className= 'header-profile-pic' alt='user profile pic'/>
                                        <div id='welcome-user-container' className='nav-link'>
                                            Welcome <br/>
                                            {props.user.first_name}
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
                            <nav id='dropdown-user-info'>
                                <p className='nav-link' id='dropdown-welcome-text'>
                                Welcome
                                </p>
                                <p id='dropdown-username'>
                                    {props.user.first_name}
                                </p>
                                <Link to='/profile' className='nav-link' id='dropdown-profile' onClick={showDropdown}>View Profile</Link>
                                <Link to='/MyVehicles' className='nav-link' id='dropdown-my-vehicles' onClick={showDropdown}>My Vehicles</Link>
                            </nav>
                        ) : (
                            <Link to='/auth' className='nav-link' onClick={showDropdown}>Login/Register</Link>
                        )}
                        <hr id='dropdown-line'/>
                        <Link to='/' className='nav-link' onClick={showDropdown}>Home</Link>
                        <Link to='/ForSale' className='nav-link' onClick={showDropdown}>Vehicles for Sale</Link>
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