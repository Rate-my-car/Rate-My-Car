import React from 'react'
import {Link} from 'react-router-dom'
import footerLogo from './styling/checkup-logo-footer.svg'
import './styling/Footer.scss'

const Footer = () => {
    return(
        <div className='footer-container'>
            <footer>
                <img src={footerLogo} className='footer-logo' alt='Checkup Logo'/>
                <nav className='footer-right'>
                    <Link to='/' className='footer-nav-link'>Home</Link>
                    <Link to='/ForSale' className='footer-nav-link'>Cars for Sale</Link>
                    <Link to='/maps' className='footer-nav-link'>Service Locator</Link>
                </nav>
            </footer>
        </div>
    )
}

export default Footer;